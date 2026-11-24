import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Zap } from 'lucide-react';

/**
 * Charging Gun Inline SVG Component Matching Uploaded Design Exactly
 * Features authentic lightning bolt cut-out, gray connector collar, and handle cap.
 */
const ChargingGunSVG = ({ color = 'currentColor', className = '' }) => (
  <svg
    width="44"
    height="28"
    viewBox="0 0 37 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ overflow: 'visible' }}
  >
    {/* Gray connector band between nozzle and body */}
    <rect x="5.4" y="1.8" width="1.1" height="10.3" fill="#888888" rx="0.3" />

    {/* Crisp White lightning bolt aligned with the authentic cut-out */}
    <path
      d="M8.39309 1.19727C8.766 1.7359 9.20757 2.28985 9.60598 2.81738L11.9458 5.90723C12.3512 6.44285 12.9373 7.17323 13.2847 7.71973C12.3887 7.7109 11.4914 7.72849 10.5972 7.7207C11.0967 9.10758 11.6646 10.4839 12.1792 11.8633L12.2095 11.9482L12.1929 11.9766C12.0494 11.8289 11.8277 11.5106 11.6861 11.3301L10.4234 9.70508L8.64309 7.41699C8.28621 6.95791 7.85492 6.42709 7.53567 5.94727C7.81274 5.9844 8.22859 5.96316 8.51809 5.95801C8.98865 5.94806 9.45965 5.94253 9.9302 5.94141C9.77386 5.4523 8.36791 1.36855 8.39309 1.19727Z"
      fill="#FFFFFF"
    />

    {/* Gun Body Paths */}
    <path
      d="M9.22805 0.00488281C7.33389 -0.0482716 6.45815 0.253445 6.44876 2.35645L6.4468 9.52148C6.44653 10.1716 6.40537 12.4046 6.49563 12.9092C6.55835 13.2646 6.7304 13.5918 6.98782 13.8447C7.65236 14.5011 8.83499 14.3577 9.7095 14.3564L12.4702 14.3535L12.4732 12.2617C14.0175 12.2452 15.5799 12.2579 17.1255 12.2588C17.8154 12.6299 18.9927 13.4667 19.6968 13.9297L24.7671 17.2822C25.6103 17.8097 26.4274 18.3767 27.2622 18.9189C27.9487 19.3559 28.5341 19.8945 29.3775 19.9775C30.6049 20.1138 31.1714 19.0877 31.8745 18.2998C32.372 17.7434 32.9025 17.1437 33.3872 16.584C34.2284 15.6127 34.3399 14.6424 33.437 13.6816C32.8496 13.0566 32.2351 12.4406 31.6294 11.8281L28.4927 8.65918C27.0784 7.23012 25.6479 5.81672 24.2017 4.41992C23.1146 3.37234 21.9571 2.18984 20.645 1.43555C19.2969 0.660555 17.8026 0.132206 16.2437 0.0283203C16.0258 0.0136709 15.7479 0.0102598 15.5259 0.00878906L10.5464 0.00488281C10.1249 0.00491912 9.64458 0.0165734 9.22805 0.00488281ZM8.39309 1.19727C8.766 1.7359 9.20757 2.28985 9.60598 2.81738L11.9458 5.90723C12.3512 6.44285 12.9373 7.17323 13.2847 7.71973C12.3887 7.7109 11.4914 7.72849 10.5972 7.7207C11.0967 9.10758 11.6646 10.4839 12.1792 11.8633L12.2095 11.9482L12.1929 11.9766C12.0494 11.8289 11.8277 11.5106 11.6861 11.3301L10.4234 9.70508L8.64309 7.41699C8.28621 6.95791 7.85492 6.42709 7.53567 5.94727C7.81274 5.9844 8.22859 5.96316 8.51809 5.95801C8.98865 5.94806 9.45965 5.94253 9.9302 5.94141C9.77386 5.4523 8.36791 1.36855 8.39309 1.19727Z"
      fill={color}
    />
    <path
      d="M5.51686 1.6294C4.2495 1.64759 2.7211 1.533 1.46481 1.6926C0.7601 1.78212 0.0322928 2.64137 0.0312943 3.40799C0.028163 5.84301 -0.0565653 8.33834 0.0666947 10.7709C0.0798101 11.0338 0.380107 11.4208 0.551564 11.6198C1.41407 12.4497 2.50884 12.1884 3.60425 12.2235C4.23684 12.2438 4.89248 12.2203 5.52771 12.2186C5.53846 8.74325 5.58167 5.09346 5.51686 1.6294Z"
      fill={color}
    />
    <path
      d="M34.9322 16.4189C34.8181 16.4581 31.5741 20.5144 31.0539 20.9986C31.7375 21.4318 32.6079 21.872 33.3275 22.252C34.764 22.9377 35.2596 21.8687 36.0845 20.9463C37.6111 19.2394 37.0474 18.6565 35.7187 17.2776C35.4517 16.9959 35.1895 16.7096 34.9322 16.4189Z"
      fill={color}
    />
  </svg>
);

export const VenomContactButton = ({
  onClick,
  onPlugConnect,
  className = '',
  label = 'Contact Us',
  isDarkBg = false,
  hidePlug = false,
}) => {
  const { isDark } = useTheme();
  const effectiveDark = isDark || isDarkBg;
  const buttonRef = useRef(null);
  const truckRef = useRef(null);
  const batteryTargetRef = useRef(null);

  // Interaction States
  const [isDragging, setIsDragging] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const [chargeProgress, setChargeProgress] = useState(20);
  const [isCharged, setIsCharged] = useState(false);
  const [truckDeparted, setTruckDeparted] = useState(false);
  const [isNearGun, setIsNearGun] = useState(false);

  // Position & Spring Physics States
  const [gunPos, setGunPos] = useState({ x: 0, y: 0, angle: 0 });
  const [btnAttachPos, setBtnAttachPos] = useState({ x: 0, y: 0 });
  const [rubberMid, setRubberMid] = useState({ x: 0, y: 0 });

  // Physics References
  const animFrameRef = useRef(null);
  const targetGunPos = useRef({ x: 0, y: 0, angle: 0 });
  const currentGunPos = useRef({ x: 0, y: 0, angle: 0 });
  const currentMidPos = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const lastGunPosRef = useRef({ x: 0, y: 0 });
  const retractionRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isChargingRef = useRef(false);
  const isChargedRef = useRef(false);

  // Calculate Anchor on Button: Matches user's exact uploaded image
  // The wire connects directly into the left rounded cap center of the Contact Us button
  const updateButtonAnchor = useCallback(() => {
    if (!buttonRef.current) return null;
    const rect = buttonRef.current.getBoundingClientRect();
    const anchor = {
      x: rect.left,
      y: rect.top + rect.height / 2,
      btnLeft: rect.left,
      btnTop: rect.top,
      btnBottom: rect.bottom,
      btnWidth: rect.width,
      btnHeight: rect.height,
    };
    setBtnAttachPos(anchor);
    return anchor;
  }, []);

  // Compute exact resting position matching the user's uploaded reference image:
  // Gun is rotated -44deg so handle is horizontal pointing right into button.
  // Straight horizontal wire connects button left center directly to gun handle collar.
  const setRestingPositions = useCallback(() => {
    const anchor = updateButtonAnchor();
    if (!anchor) return;

    // Resting gun: wire length = 28px, handle exit at (gunPos.x + 42.2, gunPos.y + 23.3)
    const wireLength = 28;
    const restingGun = {
      x: anchor.btnLeft - wireLength - 42.2,
      y: anchor.y - 23.3,
      angle: -44,
    };
    targetGunPos.current = restingGun;
    currentGunPos.current = restingGun;
    setGunPos(restingGun);

    const midX = (anchor.x + (restingGun.x + 42.2)) / 2;
    const midY = anchor.y;
    currentMidPos.current = { x: midX, y: midY, vx: 0, vy: 0 };
    setRubberMid({ x: midX, y: midY });
  }, [updateButtonAnchor]);

  useEffect(() => {
    setRestingPositions();
    const timer1 = setTimeout(setRestingPositions, 100);
    const timer2 = setTimeout(setRestingPositions, 900);
    window.addEventListener('resize', setRestingPositions);
    window.addEventListener('scroll', setRestingPositions, { passive: true });
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', setRestingPositions);
      window.removeEventListener('scroll', setRestingPositions);
    };
  }, [setRestingPositions, hidePlug]);

  // Handle Drag Start when user clicks and holds on the Gun
  const handleGunPointerDown = (e) => {
    e.preventDefault();
    if (isChargingRef.current || isChargedRef.current) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    setIsNearGun(false);

    targetGunPos.current = {
      x: e.clientX - 18,
      y: e.clientY - 14,
      angle: currentGunPos.current.angle,
    };
  };

  // Global Pointer Events for Proximity Blinking & Dragging
  useEffect(() => {
    const handlePointerMove = (e) => {
      // 1. Proximity detection when gun is at rest: blink black & green when cursor is in the zone matching user's red radius
      if (!isDraggingRef.current && !isChargingRef.current && !isChargedRef.current) {
        const gunCenterX = currentGunPos.current.x + 22;
        const gunCenterY = currentGunPos.current.y + 14;
        const btnCenterX = btnAttachPos.x || (gunCenterX + 50);
        const btnCenterY = btnAttachPos.y || gunCenterY;
        const zoneCenterX = (gunCenterX + btnCenterX) / 2;
        const zoneCenterY = (gunCenterY + btnCenterY) / 2;

        const dist = Math.hypot(e.clientX - zoneCenterX, e.clientY - zoneCenterY);
        // Radius matching the user's attached red circle: extends across KPI cards & top-right quadrant
        setIsNearGun(dist < 360);
        return;
      }

      if (!isDraggingRef.current || isChargingRef.current || isChargedRef.current) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      let targetX = mouseX - 18;
      let targetY = mouseY - 14;
      let targetAngle = 0;

      if (batteryTargetRef.current) {
        const targetRect = batteryTargetRef.current.getBoundingClientRect();
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;

        // Keep gun facing horizontally towards vehicle with subtle organic tilt
        const verticalTilt = Math.min(6, Math.max(-6, (mouseY - targetCenterY) * 0.02));
        targetAngle = verticalTilt;

        // Radius of attraction strength matching user's red circle example (~140px)
        const attractionRadius = 140;
        const nozzleX = mouseX - 18;
        const nozzleY = mouseY - 5.5;
        const distToSocket = Math.min(
          Math.hypot(nozzleX - targetCenterX, nozzleY - targetCenterY),
          Math.hypot(mouseX - targetCenterX, mouseY - targetCenterY)
        );

        // Within attraction zone: smooth magnetic pull towards socket
        if (distToSocket < attractionRadius) {
          const pullStrength = Math.pow(1 - distToSocket / attractionRadius, 1.25);
          const dockGunX = targetCenterX - 6;
          const dockGunY = targetCenterY - 8.5;

          targetX = targetX * (1 - pullStrength) + dockGunX * pullStrength;
          targetY = targetY * (1 - pullStrength) + dockGunY * pullStrength;
          targetAngle = verticalTilt * (1 - pullStrength);

          // Auto-connect smoothly when pulled into docking range (within 68px)
          if (distToSocket < 68) {
            triggerCharging(targetCenterX, targetCenterY);
            return;
          }
        }
      }

      targetGunPos.current = {
        x: targetX,
        y: targetY,
        angle: targetAngle,
      };
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);

      if (!isChargingRef.current && !isChargedRef.current) {
        // If user releases mouse within the attraction radius: auto-connect smoothly!
        if (batteryTargetRef.current) {
          const targetRect = batteryTargetRef.current.getBoundingClientRect();
          const targetCenterX = targetRect.left + targetRect.width / 2;
          const targetCenterY = targetRect.top + targetRect.height / 2;
          const currentNozzleX = currentGunPos.current.x + 18;
          const currentNozzleY = currentGunPos.current.y + 14;
          const distToSocket = Math.hypot(currentNozzleX - targetCenterX, currentNozzleY - targetCenterY);

          if (distToSocket < 140) {
            triggerCharging(targetCenterX, targetCenterY);
            return;
          }
        }

        // If user releases mouse outside attraction radius -> snap back to resting state
        setRestingPositions();
        setIsNearGun(false);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [btnAttachPos, setRestingPositions]);

  // Start 2-Second Charging Sequence (20% to 100%)
  const triggerCharging = (socketX, socketY) => {
    if (isChargingRef.current || isChargedRef.current) return;
    isChargingRef.current = true;
    isDraggingRef.current = false;
    setIsCharging(true);
    setIsDragging(true);

    // Lock gun nozzle securely into the circle with 3 dots on the battery panel
    const lockedGun = {
      x: socketX - 6,
      y: socketY - 8.5,
      angle: 0,
    };
    targetGunPos.current = lockedGun;
    currentGunPos.current = lockedGun;
    setGunPos(lockedGun);

    const startTime = performance.now();
    const duration = 2000; // 2.0 seconds

    const updateCharge = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentPct = Math.round(20 + progress * 80);
      setChargeProgress(currentPct);

      if (progress < 1) {
        requestAnimationFrame(updateCharge);
      } else {
        // 100% Fully Charged!
        isChargedRef.current = true;
        setIsCharged(true);
        setIsCharging(false);

        // Brief delay for visual satisfaction, then vehicle drives off
        setTimeout(() => {
          setTruckDeparted(true);

          // Smoothly glide the gun back to its resting position in the exact same time vehicle moves
          const anchor = updateButtonAnchor();
          if (anchor) {
            const restingGun = {
              x: anchor.btnLeft - 28 - 42.2,
              y: anchor.y - 23.3,
              angle: -44,
            };
            retractionRef.current = {
              startTime: performance.now(),
              duration: 1000,
              startPos: { ...currentGunPos.current },
              endPos: restingGun,
            };
          }

          // Transition to Contact Page when vehicle has completely departed
          setTimeout(() => {
            retractionRef.current = null;
            setIsDragging(false);
            isDraggingRef.current = false;
            isChargingRef.current = false;
            isChargedRef.current = false;
            setChargeProgress(20);
            setIsCharged(false);
            setTruckDeparted(false);
            setRestingPositions();

            if (onPlugConnect) {
              onPlugConnect();
            } else if (onClick) {
              onClick();
            }
          }, 1050);
        }, 400);
      }
    };

    requestAnimationFrame(updateCharge);
  };

  // High-Frame-Rate Spring / Rubber Physics Loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Retraction phase: smoothly glide gun back home while truck departs
      if (retractionRef.current) {
        const { startTime, duration, startPos, endPos } = retractionRef.current;
        const elapsed = now - startTime;
        const progress = Math.min(1, Math.max(0, elapsed / duration));
        // Silky cubic ease-in-out
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        currentGunPos.current.x = startPos.x + (endPos.x - startPos.x) * ease;
        currentGunPos.current.y = startPos.y + (endPos.y - startPos.y) * ease;
        currentGunPos.current.angle = startPos.angle + (endPos.angle - startPos.angle) * ease;
        targetGunPos.current = { ...currentGunPos.current };
      } else if (isChargingRef.current || isChargedRef.current) {
        // Gun position lerp: solidly locked to socket while charging
        currentGunPos.current.x = targetGunPos.current.x;
        currentGunPos.current.y = targetGunPos.current.y;
        currentGunPos.current.angle = targetGunPos.current.angle;
      } else {
        const gunLerp = isDragging ? 0.32 : 0.16;
        currentGunPos.current.x += (targetGunPos.current.x - currentGunPos.current.x) * gunLerp;
        currentGunPos.current.y += (targetGunPos.current.y - currentGunPos.current.y) * gunLerp;
        currentGunPos.current.angle +=
          (targetGunPos.current.angle - currentGunPos.current.angle) * gunLerp;
      }

      setGunPos({
        x: currentGunPos.current.x,
        y: currentGunPos.current.y,
        angle: currentGunPos.current.angle,
      });

      // Update anchor & wire physics
      const anchor = updateButtonAnchor();
      const p0 = anchor || btnAttachPos;
      const p3 = {
        x: currentGunPos.current.x + 42.2,
        y: currentGunPos.current.y + 23.3,
      };

      if (!isDragging && !isChargingRef.current && !isChargedRef.current) {
        // Precise resting horizontal midpoint matching user reference image
        const midX = (p0.x + p3.x) / 2;
        const midY = p0.y;
        currentMidPos.current.x = midX;
        currentMidPos.current.y = midY;
        currentMidPos.current.vx = 0;
        currentMidPos.current.vy = 0;
        lastGunPosRef.current = { x: currentGunPos.current.x, y: currentGunPos.current.y };
      } else {
        // Calculate velocity of gun movement for dynamic pendulum inertia
        const gunVx = (currentGunPos.current.x - lastGunPosRef.current.x) / (dt || 0.016);
        const gunVy = (currentGunPos.current.y - lastGunPosRef.current.y) / (dt || 0.016);
        lastGunPosRef.current = { x: currentGunPos.current.x, y: currentGunPos.current.y };

        // Dynamic rubber wire physics while dragging/charging
        const baseMidX = (p0.x + p3.x) / 2;
        const cableDist = Math.hypot(p3.x - p0.x, p3.y - p0.y);
        // Rich natural catenary droop (curves gracefully down with gravity)
        const droop = Math.min(130, cableDist * 0.3);

        // Dynamic swing lag: flexible middle 70% lags when moving, swings and sways naturally
        const swingLagX = Math.max(-85, Math.min(85, gunVx * 0.065));
        const swingLagY = Math.max(-50, Math.min(50, gunVy * 0.035));

        const targetMidX = baseMidX - swingLagX;
        const targetMidY = Math.max(p0.y, p3.y) + droop - swingLagY;

        // Spring stiffness & damping tuned for flexible swinging center behavior
        const stiffness = 72;
        const damping = 6.6;

        const fx = (targetMidX - currentMidPos.current.x) * stiffness;
        const fy = (targetMidY - currentMidPos.current.y) * stiffness;

        currentMidPos.current.vx = (currentMidPos.current.vx + fx * dt) * Math.exp(-damping * dt);
        currentMidPos.current.vy = (currentMidPos.current.vy + fy * dt) * Math.exp(-damping * dt);

        currentMidPos.current.x += currentMidPos.current.vx * dt;
        currentMidPos.current.y += currentMidPos.current.vy * dt;
      }

      setRubberMid({
        x: currentMidPos.current.x,
        y: currentMidPos.current.y,
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging, btnAttachPos, updateButtonAnchor]);

  // Construct 4px Wire Path
  const p0 = btnAttachPos;
  // Gun handle exit port: matches transformOrigin (42.2px 23.3px) exactly at collar center
  const p3 = {
    x: gunPos.x + 42.2,
    y: gunPos.y + 23.3,
  };

  let cablePath = '';
  if (!isDragging && !isCharging && !isCharged) {
    // EXACT UNTOUCHED RESTING SHAPE MATCHING USER'S ATTACHED IMAGE:
    // Straight horizontal line connecting button left cap to gun handle
    cablePath = `M ${p0.x} ${p0.y} L ${p3.x} ${p0.y}`;
  } else {
    // DYNAMIC SWINGING RUBBER WIRE (70% Center Area is Flexible & Swinging):
    // 1. Button side strain-relief sleeve: straight horizontal lead-out
    const maxSleeve = 22;
    const dxToGun = p0.x - p3.x;
    const sleeveLen = Math.min(maxSleeve, Math.max(4, dxToGun * 0.14));
    const pSleeve = { x: p0.x - sleeveLen, y: p0.y };

    // 2. Gun side collar: rigid strain-relief aligned with handle axis
    const handleDeg = gunPos.angle + 44;
    const handleRad = handleDeg * (Math.PI / 180);
    const hx = Math.cos(handleRad);
    const hy = Math.sin(handleRad);
    const collarLen = 16;
    const pCollar = {
      x: p3.x + hx * collarLen,
      y: p3.y + hy * collarLen,
    };

    // 3. Center 70% Flexible Swinging Body: Single Continuous Cubic Bezier
    // (Infinitely smooth C-infinity curve: ZERO EDGES, ZERO KINKS, seamless mathematical continuity)
    const pMid = rubberMid.x
      ? rubberMid
      : { x: (pSleeve.x + pCollar.x) / 2, y: Math.max(pSleeve.y, pCollar.y) + 40 };

    const cableDist = Math.hypot(p3.x - p0.x, p3.y - p0.y);
    const reach = Math.min(145, Math.max(8, cableDist * 0.33));

    // Button strain-relief sleeve exit tangent (horizontal out to the left) with droop pull
    const cp1X = pSleeve.x - reach;
    const cp1Y = pSleeve.y + (pMid.y - pSleeve.y) * 0.72;

    // Gun collar exit tangent (aligned with gun handle angle) with droop pull
    const cp2X = pCollar.x + hx * reach;
    const cp2Y = pCollar.y + hy * reach + (pMid.y - pCollar.y) * 0.52;

    // Single unified cubic bezier from sleeve to collar: perfectly smooth without intermediate joints
    cablePath = `M ${p0.x} ${p0.y} L ${pSleeve.x} ${pSleeve.y} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${pCollar.x} ${pCollar.y} L ${p3.x} ${p3.y}`;
  }

  const activeColor = '#22c55e'; // Vibrant EV Green
  const restingColor = effectiveDark ? '#9ca3af' : '#000000'; // Gray in black theme, Solid Black in light theme
  const currentColor = isDragging ? activeColor : restingColor;

  return (
    <>
      <style>{`
        @keyframes flowTowardsGun {
          from {
            stroke-dashoffset: 52px;
          }
          to {
            stroke-dashoffset: 0px;
          }
        }
        @keyframes vehiclePowerPulse {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-vehicle-power {
          animation: vehiclePowerPulse 1s ease-in-out infinite;
        }

        /* Proximity Black & Green Gun Blinking (Light Theme) */
        @keyframes gunBlinkBlackGreen {
          0%, 49.9% {
            color: #000000;
            filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.45));
          }
          50%, 100% {
            color: #22c55e;
            filter: drop-shadow(0 0 14px rgba(34, 197, 94, 0.9));
          }
        }

        /* Proximity Gray & Green Gun Blinking (Black Theme) */
        @keyframes gunBlinkGrayGreen {
          0%, 49.9% {
            color: #9ca3af;
            filter: drop-shadow(0 0 8px rgba(156, 163, 175, 0.4));
          }
          50%, 100% {
            color: #22c55e;
            filter: drop-shadow(0 0 14px rgba(34, 197, 94, 0.9));
          }
        }

        .animate-gun-blink {
          animation: gunBlinkBlackGreen 0.55s step-end infinite;
        }
        .animate-gun-blink-dark {
          animation: gunBlinkGrayGreen 0.55s step-end infinite;
        }
        @keyframes containerEnergyFlow {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>

      {/* =========================================================================
          1. CONTACT US BUTTON (Resting Light: Black Pill; Resting Dark: Green Pill; Dragging: Sharp Green above Arena)
          ========================================================================= */}
      <div className={`relative inline-flex items-center ${isDragging ? 'z-50' : 'z-20'}`}>
        <button
          ref={buttonRef}
          id="nav-btn-contact"
          onClick={() => {
            if (onClick) onClick();
          }}
          className={`relative z-50 inline-flex items-center justify-center h-9 px-5 rounded-full text-xs font-bold tracking-wide cursor-pointer select-none transition-all duration-300 shadow-md ${
            isDragging
              ? 'bg-[#16a34a] hover:bg-[#15803d] text-white shadow-[0_0_24px_rgba(34,197,94,0.85)] scale-105 border border-[#22c55e]'
              : effectiveDark
              ? 'bg-[#16a34a] hover:bg-[#15803d] text-white border border-[#22c55e]/70 shadow-[0_0_14px_rgba(34,197,94,0.35)] active:scale-95'
              : 'bg-black hover:bg-neutral-900 text-white border border-neutral-800/80 shadow-black/25 active:scale-95'
          } ${className}`}
        >
          <span className="relative z-10 flex items-center gap-1.5">
            {!hidePlug && isDragging && <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />}
            {label}
          </span>
        </button>
      </div>

      {/* =========================================================================
          2. SVG RUBBER WIRE (4px thickness) & DRAGGABLE CHARGER GUN (Hidden on Contact Page)
          ========================================================================= */}
      {!hidePlug && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {btnAttachPos.x > 0 && (
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
              {/* SVG Defs for Micro-Electricity Crackle Filter */}
              <defs>
                <filter id="electric-crackle" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.1 0.45" numOctaves="2" result="noise">
                    <animate attributeName="baseFrequency" dur="0.12s" values="0.1 0.45; 0.16 0.38; 0.08 0.5; 0.1 0.45" repeatCount="indefinite" />
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.8" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>

              {/* Green ambient bloom when dragging / charging */}
              {isDragging && (
                <path
                  d={cablePath}
                  fill="none"
                  stroke="rgba(34, 197, 94, 0.45)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="blur-sm"
                />
              )}

              {/* Core 4px Wire (Black in resting state, Green when dragging) */}
              <path
                d={cablePath}
                fill="none"
                stroke={currentColor}
                strokeWidth="4"
                strokeLinecap="round"
                className="transition-colors duration-200"
              />

              {/* Very Small Electricity Effect Near Full Wire Moving Towards Gun */}
              {isCharging && (
                <>
                  {/* 1. Subtle Electric Green Flow along wire */}
                  <path
                    d={cablePath}
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="2"
                    strokeDasharray="6 18"
                    strokeLinecap="round"
                    style={{
                      animation: 'flowTowardsGun 0.38s linear infinite',
                      filter: 'drop-shadow(0 0 5px #22c55e)',
                    }}
                  />

                  {/* 2. Crackling Jittering Electricity dancing near wire */}
                  <path
                    d={cablePath}
                    fill="none"
                    stroke="#bbf7d0"
                    strokeWidth="1.6"
                    strokeDasharray="4 14"
                    strokeLinecap="round"
                    filter="url(#electric-crackle)"
                    style={{
                      animation: 'flowTowardsGun 0.28s linear infinite',
                      filter: 'drop-shadow(0 0 3px #4ade80)',
                    }}
                  />

                  {/* 3. Micro White Electric Sparks racing rapidly into the gun */}
                  <path
                    d={cablePath}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.4"
                    strokeDasharray="2 12"
                    strokeLinecap="round"
                    style={{
                      animation: 'flowTowardsGun 0.2s linear infinite',
                      filter: 'drop-shadow(0 0 4px #ffffff)',
                    }}
                  />
                </>
              )}
            </svg>
          )}

          {/* "Drag" Hint Label (Directly in front of gun nozzle, matches user reference) */}
          {!isDragging && !isCharging && !isCharged && (
            <div
              className="fixed pointer-events-none select-none z-50 flex items-center transition-opacity duration-300"
              style={{
                left: `${gunPos.x - 44}px`,
                top: `${gunPos.y + 26}px`,
              }}
            >
              <span
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 select-none ${
                  isNearGun
                    ? 'text-[#22c55e] animate-pulse drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]'
                    : effectiveDark
                    ? 'text-[#9ca3af]'
                    : 'text-[#6b7280]'
                }`}
              >
                Drag
              </span>
            </div>
          )}

          {/* Charger Gun SVG (Draggable by clicking & holding left mouse button) */}
          <div
            className={`fixed pointer-events-auto select-none transition-transform duration-75 ${
              isDragging
                ? 'cursor-grabbing text-[#22c55e]'
                : isNearGun
                ? effectiveDark
                  ? 'cursor-grab animate-gun-blink-dark'
                  : 'cursor-grab animate-gun-blink'
                : effectiveDark
                ? 'cursor-grab text-[#9ca3af] hover:scale-105'
                : 'cursor-grab text-black hover:scale-105'
            }`}
            style={{
              left: `${gunPos.x}px`,
              top: `${gunPos.y}px`,
              transform: `rotate(${gunPos.angle}deg)`,
              transformOrigin: '42.2px 23.3px',
              filter: isDragging
                ? 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.8))'
                : isNearGun
                ? undefined
                : effectiveDark
                ? 'drop-shadow(0 0 6px rgba(156, 163, 175, 0.35))'
                : 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.45))',
            }}
            onPointerDown={handleGunPointerDown}
            title="Click and drag charger gun to vehicle battery panel"
          >
            <ChargingGunSVG color="currentColor" className="w-[44px] h-[28px] select-none" />
          </div>
        </div>
      )}

      {/* =========================================================================
          3. CHARGING ARENA & GREEN TRUCK OVERLAY
          ========================================================================= */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 flex flex-col items-center justify-center ${
          isDragging && !hidePlug
            ? 'opacity-100 pointer-events-auto bg-black/75 backdrop-blur-[6px]'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Full-width Horizontal Laser Green Line (Vehicle tires rest ON this line) */}
        <div className="absolute top-1/2 left-0 right-0 w-full h-[2.5px] bg-[#22c55e] -translate-y-1/2 shadow-[0_0_16px_#22c55e,0_0_32px_rgba(34,197,94,0.5)] pointer-events-none" />

        {/* Green Vehicle Stationed with Wheels Directly ON the Surface of the Green Line */}
        <div
          ref={truckRef}
          className="absolute z-30 transition-transform duration-1000 ease-in-out top-[calc(50%-85px)] sm:top-[calc(50%-116px)] lg:top-[calc(50%-143px)]"
          style={{
            transform: truckDeparted
              ? 'translateX(130vw) scale(1.05)'
              : 'translateX(0)',
          }}
        >
          {/* Green Electric Truck SVG (15% Smaller: w-[272px] sm:w-[374px] lg:w-[460px]) */}
          <div className="relative">
            {/* Base Vehicle Layer: Single-Vehicles-Black-Container.svg (Untouched Black Container) */}
            <img
              src="/Single-Vehicles-Black-Container.svg"
              alt="Transvolt Electric Truck with Black Container"
              className="w-[272px] sm:w-[374px] lg:w-[460px] h-auto object-contain select-none pointer-events-none drop-shadow-[0_8px_30px_rgba(34,197,94,0.35)]"
            />

            {/* Battery Charging Green Container Layer: Fills up with Vibrant Green as Battery Charges */}
            {(() => {
              const containerRightPct = isCharged
                ? 100
                : isCharging
                ? 2.08 + 70.17 * (chargeProgress / 100)
                : 2.08;
              return (
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{
                    opacity: isCharging || isCharged ? 1 : 0,
                    clipPath: isCharged
                      ? 'none'
                      : isCharging
                      ? `polygon(0% 0%, ${containerRightPct}% 0%, ${containerRightPct}% 100%, 0% 100%)`
                      : 'polygon(0% 0%, 2.08% 0%, 2.08% 100%, 0% 100%)',
                  }}
                >
                  <img
                    src="/Single-Non_Power-Vehicles-Fill-Color-SVG.svg"
                    alt="Transvolt Green Commercial EV"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />

                  {/* Micro Electric Energy Shimmer across charged portion of container */}
                  {isCharging && chargeProgress < 100 && (
                    <div
                      className="absolute pointer-events-none z-10 overflow-hidden"
                      style={{
                        left: '2.08%',
                        top: '1.34%',
                        width: `${70.17 * (chargeProgress / 100)}%`,
                        height: '62.5%',
                      }}
                    >
                      <div
                        className="w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        style={{
                          animation: 'containerEnergyFlow 0.8s linear infinite',
                          backgroundSize: '200% 100%',
                        }}
                      />
                    </div>
                  )}

                  {/* Neon Green Laser Charging Wavefront */}
                  {isCharging && chargeProgress < 100 && (
                    <div
                      className="absolute pointer-events-none z-20"
                      style={{
                        left: `${containerRightPct}%`,
                        top: '1.34%',
                        height: '62.5%',
                        width: '3.5px',
                        transform: 'translateX(-50%)',
                        background: '#ffffff',
                        boxShadow: '0 0 10px #4ade80, 0 0 20px #22c55e, 0 0 35px #22c55e',
                        borderRadius: '2px',
                      }}
                    >
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#22c55e] animate-ping" />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#22c55e] animate-ping" />
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Superimposed Power Vehicle Layer: Single-Power-Vehicles-Fill-Color-SVG (Clipped to Battery Box & Cab) */}
            <img
              src="/Single-Power-Vehicles-Fill-Color-SVG.svg"
              alt="Transvolt Green Commercial EV Power Indicator"
              className={`absolute inset-0 w-full h-full object-contain select-none pointer-events-none transition-opacity duration-500 ${
                truckDeparted
                  ? 'opacity-0'
                  : isCharging
                  ? 'opacity-100'
                  : 'animate-vehicle-power'
              }`}
              style={{
                clipPath: 'polygon(72.2% 0%, 100% 0%, 100% 100%, 72.2% 100%)',
              }}
            />

            {/* Invisible Hitbox for Battery Panel Socket (Exact Socket: cx=218/282=77.3%, cy=45/94=47.9%) */}
            <div
              ref={batteryTargetRef}
              className="absolute top-[47.9%] left-[77.3%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 pointer-events-none opacity-0"
            />

            {/* Digital Live Charging HUD on Vehicle Container (20% -> 100%) */}
            {(isCharging || isCharged) && (
              <div className="absolute top-[18%] left-[25%] -translate-y-1/2 bg-black/92 text-white border-2 border-[#22c55e] rounded-xl px-4 py-1.5 shadow-[0_0_25px_rgba(34,197,94,0.85)] backdrop-blur-md animate-bounce flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#22c55e] fill-[#22c55e] animate-pulse" />
                <span className="font-extrabold text-lg sm:text-2xl tracking-wider text-white tabular-nums">
                  {chargeProgress}%
                </span>
                <span className="text-[11px] font-bold text-[#22c55e] uppercase">
                  {isCharged ? 'FULL' : 'CHARGING'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Text Area: Green text is placed ABOVE the white text as requested */}
        <div className="absolute top-[calc(50%+42px)] left-0 right-0 text-center px-4 pointer-events-none flex flex-col items-center">
          {/* Green Status/Action Instruction Text (ABOVE White Text) */}
          <p className="text-[#22c55e] font-bold text-xs sm:text-sm tracking-wide mb-1 animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
            {isCharging
              ? '⚡ Charging in progress... Hold tight!'
              : isCharged
              ? '✓ Fully Charged! Transitioning to Contact...'
              : "Drag the Charging Gun to the Vehicle's Charging Port to Connect with Us"}
          </p>

          {/* White Mission Text (BELOW Green Text) */}
          <p className="text-white font-bold text-lg sm:text-2xl lg:text-[26px] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            Join us to the mission towards the green Environment
          </p>
        </div>

        {/* Cancel Button in Corner */}
        <button
          onClick={() => {
            setIsDragging(false);
            isDraggingRef.current = false;
            setRestingPositions();
          }}
          className="absolute top-6 right-5 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20 cursor-pointer transition-colors"
        >
          Cancel
        </button>
      </div>
    </>
  );
};
