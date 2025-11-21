'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Chess } from 'chess.js';
import emailjs from '@emailjs/browser';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

function PolishedFallbackBoard({
  fen,
  maxSize = 420,
  theme = DEFAULT_BOARD_THEME,
  lastMove = null,
}) {
  const boardRef = React.useRef(null);
  const [boardRect, setBoardRect] = React.useState({ width: 0 });
  const [isResizing, setIsResizing] = React.useState(false);
  const resizeTimerRef = React.useRef(null);
  const prevPiecesRef = React.useRef([]);
  const idCounter = React.useRef(1);
  const [renderPieces, setRenderPieces] = React.useState([]);

  React.useEffect(() => {
    if (!boardRef.current) return undefined;
    const el = boardRef.current;
    const ro = new ResizeObserver(() => {
      setIsResizing(true);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => setIsResizing(false), 150);

      const r = el.getBoundingClientRect();
      setBoardRect({ width: Math.floor(r.width) });
    });
    ro.observe(el);
    const r = el.getBoundingClientRect();
    setBoardRect({ width: Math.floor(r.width) });
    return () => {
      ro.disconnect();
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, []);

  function parseFenPieces(f) {
    const rows = (f || '').split(' ')[0]?.split('/') ?? [
      '8',
      '8',
      '8',
      '8',
      '8',
      '8',
      '8',
      '8',
    ];
    const pieces = [];
    rows.forEach((rowStr, rIdx) => {
      let c = 0;
      for (const ch of rowStr) {
        if (/[1-8]/.test(ch)) {
          c += Number(ch);
        } else {
          pieces.push({ kind: ch, row: rIdx, col: c });
          c += 1;
        }
      }
    });
    return pieces;
  }

  function coordToPx(row, col) {
    const size = boardRect.width || Math.min(maxSize, 520);
    const cell = size / 8;
    return {
      left: Math.round(col * cell),
      top: Math.round(row * cell),
      cellSize: Math.round(cell),
    };
  }

  React.useEffect(() => {
    const newPieces = parseFenPieces(fen);
    const prev = prevPiecesRef.current.slice();
    const assignedPrev = new Array(prev.length).fill(false);
    const matched = [];

    function dist(a, b) {
      return Math.hypot(a.row - b.row, a.col - b.col);
    }

    const remainingNew = newPieces.slice();
    if (lastMove && lastMove.from) {
      try {
        const algebraicToCoord = (sq) => {
          if (!sq || sq.length < 2) return null;
          const file = sq[0];
          const rank = sq.length === 3 ? sq[2] : sq[1];
          const col = file.charCodeAt(0) - 97;
          const row = 8 - Number(rank);
          return { row, col };
        };

        const fromCoord = algebraicToCoord(lastMove.from);
        const toCoord = algebraicToCoord(lastMove.to);
        if (fromCoord && toCoord) {
          const prevIdx = prev.findIndex(
            (pp) => pp.row === fromCoord.row && pp.col === fromCoord.col,
          );
          if (prevIdx >= 0) {
            const pp = prev[prevIdx];
            assignedPrev[prevIdx] = true;
            matched.push({
              id: pp.id,
              kind: pp.kind,
              row: toCoord.row,
              col: toCoord.col,
              fromRow: pp.row,
              fromCol: pp.col,
            });
            const newIdx = remainingNew.findIndex(
              (np) => np.row === toCoord.row && np.col === toCoord.col,
            );
            if (newIdx >= 0) remainingNew.splice(newIdx, 1);
          }
        }
      } catch (err) {}
    }

    remainingNew.forEach((np) => {
      let bestIdx = -1;
      let bestD = Infinity;
      prev.forEach((pp, i) => {
        if (assignedPrev[i]) return;
        if (pp.kind !== np.kind) return;
        const d = dist(pp, np);
        if (d < bestD) {
          bestD = d;
          bestIdx = i;
        }
      });
      if (bestIdx >= 0) {
        assignedPrev[bestIdx] = true;
        const pp = prev[bestIdx];
        matched.push({
          id: pp.id,
          kind: np.kind,
          row: np.row,
          col: np.col,
          fromRow: pp.row,
          fromCol: pp.col,
        });
      } else {
        const id = idCounter.current++;
        matched.push({
          id,
          kind: np.kind,
          row: np.row,
          col: np.col,
          fromRow: np.row,
          fromCol: np.col,
          isNew: true,
        });
      }
    });

    prev.forEach((pp, i) => {
      if (!assignedPrev[i])
        matched.push({
          id: pp.id,
          kind: pp.kind,
          row: pp.row,
          col: pp.col,
          fromRow: pp.row,
          fromCol: pp.col,
          removed: true,
        });
    });

    const initial = matched.map((p) => {
      const from = coordToPx(p.fromRow, p.fromCol);
      const to = coordToPx(p.row, p.col);
      return {
        id: p.id,
        kind: p.kind,
        left: from.left,
        top: from.top,
        targetLeft: to.left,
        targetTop: to.top,
        opacity: p.removed ? 1 : p.isNew ? 0 : 1,
        removed: !!p.removed,
      };
    });

    prevPiecesRef.current = matched
      .filter((p) => !p.removed)
      .map((p) => ({ id: p.id, kind: p.kind, row: p.row, col: p.col }));

    setRenderPieces(initial);
    requestAnimationFrame(() => {
      setRenderPieces((cur) =>
        cur.map((p) => ({
          ...p,
          left: p.targetLeft,
          top: p.targetTop,
          opacity: p.removed ? 0 : 1,
        })),
      );
    });

    const cleanup = setTimeout(
      () => setRenderPieces((cur) => cur.filter((p) => !p.removed)),
      520,
    );
    return () => clearTimeout(cleanup);
  }, [fen, boardRect.width]);

  const squares = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const isLight = (r + c) % 2 === 0;
      const bg = isLight ? theme.lightSquare : theme.darkSquare;
      const isLastCol = c === 7;
      const isLastRow = r === 7;
      const cellStyle = {
        width: '100%',
        height: '100%',
        background: bg,
        boxSizing: 'border-box',
        ...(theme.showSquareBorders
          ? {
              borderRight: isLastCol
                ? 'none'
                : `${theme.squareBorderWidth}px solid ${theme.squareBorderColor}`,
              borderBottom: isLastRow
                ? 'none'
                : `${theme.squareBorderWidth}px solid ${theme.squareBorderColor}`,
            }
          : {}),
      };
      squares.push(<div key={`s-${r}-${c}`} style={cellStyle} />);
    }
  }

  const sizeStyle = {
    width: '100%',
    maxWidth: maxSize,
    aspectRatio: '1/1',
    position: 'relative',
  };

  return (
    <div
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      className="border-border border"
    >
      <div ref={boardRef} style={sizeStyle}>
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'repeat(8, 1fr)',
            gridTemplateColumns: 'repeat(8, 1fr)',
            width: '100%',
            height: '100%',
            borderRadius: theme.boardRadius,
            overflow: 'hidden',
            border: `1px solid ${theme.border}`,
            background: theme.boardBackground || theme.lightSquare,
          }}
          aria-hidden
        >
          {squares}
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {renderPieces.map((p) => {
            const cellPx = boardRect.width
              ? Math.round(boardRect.width / 8)
              : null;
            const transitionStyle = isResizing
              ? 'none'
              : 'left 360ms cubic-bezier(.2,.8,.2,1), top 360ms cubic-bezier(.2,.8,.2,1), opacity 260ms ease';
            const isEnemy = p.kind === p.kind.toLowerCase();
            const fillColor = isEnemy
              ? theme.enemyColor
              : theme.pieceStyle === 'unicode'
                ? theme.pieceColor
                : theme.pieceFill;
            const strokeColor = isEnemy
              ? theme.enemyColor
              : theme.pieceStyle === 'outline'
                ? theme.pieceColor
                : 'none';

            return (
              <div
                key={`p-${p.id}`}
                style={{
                  position: 'absolute',
                  left: p.left,
                  top: p.top,
                  width: cellPx ? `${cellPx}px` : '12.5%',
                  height: cellPx ? `${cellPx}px` : '12.5%',
                  transition: transitionStyle,
                  opacity: p.opacity,
                }}
              >
                <svg
                  viewBox="0 0 100 100"
                  style={{ width: '95%', height: '95%' }}
                >
                  <text
                    x="51%"
                    y="61%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={Math.floor(100 * theme.pieceFontScale)}
                    fontFamily="serif"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={
                      theme.pieceStyle === 'outline'
                        ? theme.pieceStrokeWidth
                        : 0
                    }
                    style={{ paintOrder: 'stroke fill' }}
                  >
                    {mapPieceChar(p.kind, theme)}
                  </text>
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function mapPieceChar(p, theme) {
  const unicode = {
    p: '♟',
    r: '♜',
    n: '♞',
    b: '♝',
    q: '♛',
    k: '♚',
    P: '♙',
    R: '♖',
    N: '♘',
    B: '♗',
    Q: '♕',
    K: '♔',
  };

  if (theme && theme.pieceStyle === 'unicode') {
    return unicode[p] ?? p;
  }
  const ascii = {
    r: 'r',
    n: 'n',
    b: 'b',
    q: 'q',
    k: 'k',
    p: 'p',
    R: 'R',
    N: 'N',
    B: 'B',
    Q: 'Q',
    K: 'K',
    P: 'P',
  };
  return ascii[p] ?? unicode[p] ?? p;
}
function BoardControls({ isPlaying, onPlayPause }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button
        onClick={onPlayPause}
        className="text-secondary rounded-none border bg-[#111] px-3 py-2"
        aria-pressed={isPlaying}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
const TICK = 1000;
const DEFAULT_BOARD_THEME = {
  lightSquare: 'var(--light-square)',
  darkSquare: 'var(--dark-square)',
  border: 'var(--board-border)',
  boardRadius: 0,
  boardBackground: 'transparent',
  squareBorderColor: 'var(--square-border)',
  squareBorderWidth: 1,
  showSquareBorders: true,
  pieceStyle: 'unicode',
  pieceColor: 'var(--white-piece)',
  pieceFill: 'transparent',
  pieceStrokeWidth: 1.5,
  pieceScale: 0.72,
  pieceFontScale: 0.72,
  enemyColor: 'var(--black-piece)',
};
const MOVES = [
  'Nf3',
  'Nf6',
  'c4',
  'g6',
  'Nc3',
  'Bg7',
  'd4',
  'O-O',
  'Bf4',
  'd5',
  'Qb3',
  'dxc4',
  'Qxc4',
  'c6',
  'e4',
  'Nbd7',
  'Rd1',
  'Nb6',
  'Qc5',
  'Bg4',
  'Bg5',
  'Na4',
  'Qa3',
  'Nxc3',
  'bxc3',
  'Nxe4',
  'Bxe7',
  'Qb6',
  'Bc4',
  'Nxc3',
  'Bc5',
  'Rfe8+',
  'Kf1',
  'Be6',
  'Bxb6',
  'Bxc4+',
  'Kg1',
  'Ne2+',
  'Kf1',
  'Nxd4+',
  'Kg1',
  'Ne2+',
  'Kf1',
  'Nc3+',
  'Kg1',
  'axb6',
  'Qb4',
  'Ra4',
  'Qxb6',
  'Nxd1',
  'h3',
  'Rxa2',
  'Kh2',
  'Nxf2',
  'Re1',
  'Rxe1',
  'Qd8+',
  'Bf8',
  'Nxe1',
  'Bd5',
  'Nf3',
  'Ne4',
  'Qb8',
  'b5',
  'h4',
  'h5',
  'Ne5',
  'Kg7',
  'Kg1',
  'Bc5+',
  'Kf1',
  'Ng3+',
  'Ke1',
  'Bb4+',
  'Kd1',
  'Bb3+',
  'Kc1',
  'Ne2+',
  'Kb1',
  'Nc3+',
  'Kc1',
  'Rc2#',
];

export default function Outro() {
  const gameRef = useRef(new Chess());
  const moveIndexRef = useRef(0);
  const [fen, setFen] = useState(gameRef.current.fen());
  const [isPlaying, setIsPlaying] = useState(true);
  const [lastMove, setLastMove] = useState(null);
  useEffect(() => {
    const game = gameRef.current;
    let interval = null;

    function advance() {
      const idx = moveIndexRef.current;
      if (idx >= MOVES.length) {
        try {
          game.reset();
        } catch (err) {
          console.error('Failed to reset game', err);
        }
        moveIndexRef.current = 0;
        requestAnimationFrame(() => setFen(game.fen()));
        return;
      }

      const move = MOVES[idx];
      try {
        const result = game.move(move, { sloppy: true });
        if (!result) {
          console.warn('Skipping invalid move:', move, 'at index', idx);
          moveIndexRef.current = idx + 1;
          return;
        }
        requestAnimationFrame(() => setFen(game.fen()));
        setLastMove({
          from: result.from,
          to: result.to,
          san: result.san,
          color: result.color,
        });
        moveIndexRef.current = idx + 1;
      } catch (err) {
        console.error('Error applying move', move, err);
        moveIndexRef.current = idx + 1;
      }
    }

    function startInterval() {
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        if (isPlaying) advance();
      }, TICK);
    }

    startInterval();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  function validateFormValues(values) {
    const errors = { email: '', message: '' };
    const email = (values.email || '').trim();
    const message = (values.message || '').trim();

    if (!email) {
      errors.email = 'Email is required.';
    } else if (email.includes(' ')) {
      errors.email = 'Email cannot contain spaces.';
    } else if (!email.includes('@')) {
      errors.email = `Please include an '@' in the email address. '${email}' is missing an '@'.`;
    } else if (email.length < 6 || email.length > 320) {
      errors.email = 'Email must be between 6 and 320 characters.';
    } else if (/^\.+|\.+$/.test(email)) {
      errors.email = 'Email cannot start or end with a dot.';
    } else if (email.includes('..')) {
      errors.email = 'Email cannot contain consecutive dots.';
    } else if (!/^[A-Za-z0-9._%+-@]+$/.test(email)) {
      errors.email = 'Email contains invalid characters.';
    } else {
      const parts = email.split('@');
      const local = parts[0];
      const domain = (parts[1] || '').toLowerCase();

      if (parts.length !== 2 || !local || !domain) {
        errors.email = 'Please enter a valid email address.';
      } else if (/^[-]|[-]$/.test(local)) {
        errors.email = 'Email cannot start or end with a hyphen.';
      } else if (/^[-]|[-]$/.test(domain)) {
        errors.email = 'Domain cannot start or end with a hyphen.';
      } else if (!domain.includes('.')) {
        errors.email = `The domain '${domain}' looks incomplete. Please include a top-level domain (for example '.com').`;
      } else if (/\d/.test(domain.split('.').pop())) {
        errors.email = 'The email’s domain extension cannot contain numbers.';
      } else if (/^\d+$/.test(domain.split('.').pop())) {
        errors.email = 'The email’s domain extension cannot be all numbers.';
      } else {
        const tld = domain.split('.').pop();
        if (tld.length < 2 || tld.length > 24) {
          errors.email = 'The email’s domain extension looks invalid.';
        } else {
          const blockedDomains = ['mailinator.com', 'tempmail.com'];
          if (blockedDomains.includes(domain)) {
            errors.email = 'Disposable email addresses are not allowed.';
          }
        }
      }
    }

    if (!message || !message.trim()) {
      errors.message = 'Please share what you’d like to communicate.';
    } else if (message.trim().length < 10) {
      errors.message = 'Please provide a few more details.';
    } else if (message.length > 2000) {
      errors.message =
        'This is a bit too long. Please keep it under 2000 characters.';
    }

    return errors;
  }
  const sendEmail = (e) => {
    e.preventDefault();
    if (isSending) return;
    setSubmitAttempted(true);

    const values = {
      email: form.current?.user_email?.value ?? '',
      message: form.current?.message?.value ?? '',
    };

    const errors = validateFormValues(values);
    setFormErrors(errors);

    const hasErrors = Boolean(errors.email || errors.message);
    if (hasErrors) return; // bail out and show errors

    setIsSending(true);
    emailjs
      .sendForm(
        // Emailjs Service ID, Template ID, Public Key
      )
      .then(
        () => {
          form.current.reset();
          setFormErrors({ email: '', message: '' });
          setSubmitAttempted(false);
          setIsSending(false);
          setDialogOpen(true);
        },
        () => {
          alert('Failed to send. Please try again.');
          setIsSending(false);
        },
      );
  };
  const form = useRef();
  const [formErrors, setFormErrors] = useState({ email: '', message: '' });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="w-full px-[50px] pt-[25px] [@media(max-width:450px)]:px-0">
      <div className="mx-auto flex w-full max-w-[1220px] min-w-[350px] flex-wrap justify-center gap-[25px] px-[25px]">
        <div className="border-border bg-card flex min-w-[350px] flex-1 flex-col border p-[15px]">
          <div className="fill-muted text-muted flex flex-row items-center gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.80"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-notebook-pen-icon lucide-notebook-pen light-svg-stroke"
            >
              <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
              <path d="M2 6h4" />
              <path d="M2 10h4" />
              <path d="M2 14h4" />
              <path d="M2 18h4" />
              <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
            </svg>
            <h1 className="font-poppins text-[14px] select-none">
              BEYOND CODING
            </h1>
          </div>

          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <div
              style={{
                display: 'flex',
                gap: 15,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              {/*
              <BoardControls
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying((v) => !v)}
              />
              <p className="text-muted mt-3 text-xs select-none">{fen}</p>
              */}

              <div className="border-border light:px-[25px] light:font-rubik light:text-[13.50px] text-secondary bg-card-inner flex cursor-default items-center justify-center border px-[15px] py-[15px] text-[14px] leading-[130%]">
                Inspired by Daniel Naroditsky, Mark is currently exploring
                chess. He focuses on blitz games to train rapid, strategic
                decision-making.
              </div>
              <PolishedFallbackBoard
                fen={fen}
                maxSize={450}
                lastMove={lastMove}
              />
            </div>
          </div>
        </div>

        {/* CONNECT */}

        <div className="border-border bg-card flex min-w-[350px] flex-1 flex-col border p-[15px]">
          <div className="fill-muted text-muted flex flex-row items-center gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="light-svg-stroke"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
            <h1 className="font-poppins text-[14px] select-none">CONNECT</h1>
          </div>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-1 flex-col gap-[15px] pt-[15px]"
          >
            {(() => {
              const emailError = formErrors.email;
              return (
                <div style={{ position: 'relative' }}>
                  <Input
                    id="user_email"
                    type="text"
                    inputMode="email"
                    name="user_email"
                    spellCheck={false}
                    autoComplete="off"
                    aria-invalid={Boolean(emailError)}
                    aria-describedby={emailError ? 'email-tooltip' : undefined}
                    placeholder="example@email.com*"
                    className={`border-border placeholder-secondary/95 font-rubik-l light:font-rubik text-primary focus:border-input-border focus:bg-input light:text-[13.50px] rounded-none border px-[15px] py-[15px] text-[14px] shadow-xs transition-colors outline-none md:text-[14px] ${
                      emailError
                        ? '!border-error-border !bg-error focus:border-error-border'
                        : ''
                    }`}
                    onChange={(e) => {
                      const value = e.target.value;
                      const errors = validateFormValues({
                        email: value,
                        message: form.current?.message?.value ?? '',
                      });
                      setFormErrors((prev) => ({
                        ...prev,
                        email: errors.email || '',
                      }));
                    }}
                  />
                  {emailError ? (
                    <div
                      id="email-tooltip"
                      role="tooltip"
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: '100%',
                        marginBottom: 6,
                        background: 'var(--tooltip-background)',
                        color: 'var(--secondary)',
                        padding: '6px 15px',
                        borderRadius: 5,
                        fontFamily: 'inherit',
                        fontSize: '14px',
                        whiteSpace: 'normal',
                        border: '1px solid var(--tooltip-border)',
                        zIndex: 60,
                      }}
                    >
                      {formErrors.email}
                    </div>
                  ) : null}
                </div>
              );
            })()}

            {(() => {
              const msgError = formErrors.message;
              return (
                <div style={{ position: 'relative' }} className="flex-1">
                  <textarea
                    id="message"
                    name="message"
                    spellCheck={false}
                    aria-invalid={Boolean(msgError)}
                    aria-describedby={msgError ? 'message-tooltip' : undefined}
                    className={`border-border placeholder-muted font-rubik-l light:font-rubik text-primary focus:border-input-border focus:bg-input box-border flex h-full min-h-[300px] w-full min-w-0 flex-1 resize-none rounded-none border-[0.5px] px-[15px] py-[15px] text-[14px] leading-[130%] shadow-xs transition-colors outline-none md:text-[14px] ${
                      msgError
                        ? '!border-error-border !bg-error focus:border-error-border'
                        : ''
                    }`}
                    placeholder="drop me a message*"
                    onChange={(e) => {
                      const value = e.target.value;
                      const errors = validateFormValues({
                        email: form.current?.user_email?.value ?? '',
                        message: value,
                      });
                      setFormErrors((prev) => ({
                        ...prev,
                        message: errors.message || '',
                      }));
                    }}
                  />
                  {msgError ? (
                    <div
                      id="message-tooltip"
                      role="tooltip"
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: '100%',
                        marginBottom: 6,
                        background: 'var(--tooltip-background)',
                        color: 'var(--secondary)',
                        padding: '6px 15px',
                        borderRadius: 5,
                        fontFamily: 'inherit',
                        fontSize: '14px',
                        whiteSpace: 'normal',
                        border: '1px solid var(--tooltip-border)',
                        zIndex: 60,
                      }}
                    >
                      {formErrors.message}
                    </div>
                  ) : null}
                </div>
              );
            })()}

            <Button
              type="submit"
              disabled={isSending}
              className={`light:text-secondary text-secondary border-button-border bg-button flex rounded-none border-[0.5px] text-[12px] ${isSending ? 'cursor-not-allowed opacity-50' : 'hover:text-primary hover:border-button-border-hover hover:from-button-gradient-start hover:to-button-gradient-end hover:cursor-pointer hover:border-[0.1px] hover:bg-gradient-to-b'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary mx-[5px]"
              >
                <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
                <path d="M6 12h16" />
              </svg>
              <p className="font-poppins-l light:font-poppins select-none">
                {isSending ? 'Sending...' : 'Submit'}
              </p>
            </Button>
          </form>
        </div>
      </div>

      {/* DIALOGUE */}

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        className="!w-[350px]"
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Email Sent</DialogTitle>
            <DialogDescription>
              Thank you! Your message has been successfully sent. I appreciate
              you reaching out, I’ll get back to you as soon as I can.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center sm:justify-end">
            <Button
              onClick={() => setDialogOpen(false)}
              className="font-poppins-l mb-[15px] mt-[10px] light:font-poppins mr-0 sm:mr-4 text-secondary border-button-border hover:text-primary bg-button hover:bg-button-border-hover hover:border-button-border-hover hover:from-button-gradient-start hover:to-button-gradient-end cursor-pointer rounded-none border-[0.1px] text-[12px] transition-all duration-500 ease-out hover:bg-gradient-to-b"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
