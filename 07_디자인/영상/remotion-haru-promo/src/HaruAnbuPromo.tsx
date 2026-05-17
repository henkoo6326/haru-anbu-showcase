import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const ink = "#101827";
const blue = "#2C7AFC";
const sky = "#13C7DF";
const green = "#059669";
const red = "#EF2D2D";
const paper = "#F8FBFF";
const dark = "#060B18";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const fontFamily =
  "'Pretendard Variable', 'Pretendard', 'Apple SD Gothic Neo', system-ui, sans-serif";

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const snap = Easing.bezier(0.08, 0.9, 0.08, 1);
const soft = Easing.bezier(0.34, 0.02, 0.16, 1);

const p = (frame: number, start: number, duration: number, easing = ease) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing,
  });

const drift = (frame: number, amount = 8) => Math.sin(frame / 22) * amount;

const Scene: React.FC<{
  start: number;
  end: number;
  children: (local: number, global: number) => React.ReactNode;
}> = ({ start, end, children }) => {
  const frame = useCurrentFrame();
  if (frame < start || frame >= end) {
    return null;
  }
  return <AbsoluteFill>{children(frame - start, frame)}</AbsoluteFill>;
};

const Stage: React.FC<{ color?: string; grid?: boolean }> = ({
  color = paper,
  grid = true,
}) => {
  return (
    <AbsoluteFill style={{ background: color, overflow: "hidden" }}>
      {grid ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: color === dark || color === blue || color === red ? 0.1 : 0.12,
            backgroundImage:
              color === dark || color === blue || color === red
                ? "linear-gradient(#ffffff22 1px, transparent 1px), linear-gradient(90deg, #ffffff22 1px, transparent 1px)"
                : "linear-gradient(#10182718 1px, transparent 1px), linear-gradient(90deg, #10182718 1px, transparent 1px)",
            backgroundSize: "96px 96px",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

const BigType: React.FC<{
  local: number;
  at: number;
  text: string;
  y: number;
  size?: number;
  color?: string;
  exitAt?: number;
}> = ({ local, at, text, y, size = 150, color = ink, exitAt }) => {
  const intro = p(local, at, 18, snap);
  const outro =
    exitAt === undefined
      ? 1
      : interpolate(local, [exitAt, exitAt + 16], [1, 0], {
          ...clamp,
          easing: Easing.bezier(0.7, 0, 0.84, 0),
        });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: y,
        width: 1920,
        textAlign: "center",
        fontFamily,
        fontSize: size,
        lineHeight: 0.9,
        fontWeight: 880,
        color,
        letterSpacing: 0,
        opacity: intro * outro,
        transform: `translateY(${(1 - intro) * 96 + (1 - outro) * -70}px) scale(${
          0.82 + intro * 0.18 + (1 - outro) * 0.08
        })`,
      }}
    >
      {text}
    </div>
  );
};

const Phone: React.FC<{
  local: number;
  at: number;
  image: string;
  center?: boolean;
  scale?: number;
  rotate?: number;
  zoom?: number;
}> = ({ local, at, image, center = true, scale = 1, rotate = 0, zoom = 1 }) => {
  const intro = p(local, at, 26, snap);
  const x = center ? 725 : 1050;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 78,
        width: 470,
        height: 940,
        borderRadius: 76,
        padding: 14,
        background:
          "linear-gradient(145deg, #F8FAFC 0%, #C9D4E2 42%, #FFFFFF 56%, #172033 100%)",
        boxShadow: "0 52px 130px rgba(16,24,39,.28)",
        opacity: intro,
        transform: `translateY(${(1 - intro) * 120 + drift(local)}px) rotate(${
          rotate * intro
        }deg) scale(${scale * (0.86 + intro * 0.14)})`,
        transformOrigin: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 163,
          top: 28,
          width: 144,
          height: 40,
          borderRadius: 999,
          background: "#05070D",
          zIndex: 3,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 62,
          overflow: "hidden",
          border: "5px solid #0F172A",
          background: "#EAF3FF",
        }}
      >
        <Img
          src={staticFile(image)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            transform: `scale(${zoom})`,
            transformOrigin: "center top",
          }}
        />
      </div>
    </div>
  );
};

const SearchToAnswer: React.FC<{
  local: number;
  at: number;
  query: string;
  answer: string;
  color?: string;
  exitAt?: number;
}> = ({ local, at, query, answer, color = blue, exitAt }) => {
  const bar = p(local, at, 18, snap);
  const typing = p(local, at + 18, 44, Easing.linear);
  const spinIn = p(local, at + 70, 18, ease);
  const answerIn = p(local, at + 112, 22, snap);
  const exit =
    exitAt === undefined
      ? 1
      : interpolate(local, [exitAt, exitAt + 16], [1, 0], {
          ...clamp,
          easing: Easing.bezier(0.7, 0, 0.84, 0),
        });
  const letters = Math.round(query.length * typing);
  const rotation = interpolate(local, [at + 70, at + 132], [0, 540], clamp);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 255,
          width: 980,
          height: 96,
          borderRadius: 48,
          background: "#fff",
          boxShadow: "0 30px 88px rgba(16,24,39,.16)",
          transform: `translateX(-50%) translateY(${(1 - bar) * 40}px) scale(${
            0.92 + bar * 0.08
          })`,
          opacity: bar * exit,
          display: "flex",
          alignItems: "center",
          padding: "0 38px",
          fontFamily,
          fontSize: 38,
          fontWeight: 780,
          color: ink,
        }}
      >
        <span style={{ color, marginRight: 22 }}>AI</span>
        <span>{query.slice(0, letters)}</span>
        <span style={{ opacity: interpolate(local % 24, [0, 12, 24], [0, 1, 0], clamp) }}>
          |
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 420,
          width: 560,
          height: 168,
          borderRadius: 38,
          background: color,
          color: "#fff",
          boxShadow: `0 34px 100px ${color}44`,
          opacity: spinIn * exit,
          transform: `translateX(-50%) scale(${0.9 + spinIn * 0.1})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          fontFamily,
          fontSize: 34,
          fontWeight: 850,
        }}
      >
        <Img
          src={staticFile("logo/haru-symbol.svg")}
          style={{
            width: 68,
            filter: "brightness(0) invert(1)",
            transform: `rotate(${rotation}deg)`,
          }}
        />
        답변 정리중...
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 416,
          width: 920,
          minHeight: 170,
          borderRadius: 44,
          background: "#fff",
          color: ink,
          boxShadow: "0 36px 100px rgba(16,24,39,.17)",
          opacity: answerIn * exit,
          transform: `translateX(-50%) translateY(${(1 - answerIn) * 34}px) scale(${
            0.94 + answerIn * 0.06
          })`,
          padding: "40px 54px",
          fontFamily,
          fontSize: 44,
          lineHeight: 1.22,
          fontWeight: 850,
          textAlign: "center",
          wordBreak: "keep-all",
        }}
      >
        {answer}
      </div>
    </>
  );
};

const LogoToSearchBridge: React.FC<{ local: number; at: number }> = ({ local, at }) => {
  const grow = p(local, at, 30, soft);
  const fadeOut = interpolate(local, [at + 28, at + 46], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 255,
        width: interpolate(grow, [0, 1], [96, 980], clamp),
        height: interpolate(grow, [0, 1], [96, 96], clamp),
        borderRadius: 48,
        background: "#fff",
        boxShadow: "0 30px 88px rgba(16,24,39,.16)",
        opacity: fadeOut,
        transform: `translateX(-50%) scale(${0.9 + grow * 0.1})`,
        display: "flex",
        alignItems: "center",
        paddingLeft: interpolate(grow, [0, 1], [14, 38], clamp),
        overflow: "hidden",
        fontFamily,
        fontSize: 38,
        fontWeight: 850,
        color: blue,
      }}
    >
      <Img
        src={staticFile("logo/haru-symbol.svg")}
        style={{
          width: 68,
          marginRight: interpolate(grow, [0, 1], [0, 22], clamp),
        }}
      />
      <span style={{ opacity: grow }}>AI</span>
    </div>
  );
};

const LogoZoomBridge: React.FC<{ local: number; at: number }> = ({ local, at }) => {
  const zoom = p(local, at, 54, soft);
  const bg = p(local, at + 8, 30, ease);
  const name = p(local, at + 46, 22, snap);
  return (
    <AbsoluteFill style={{ opacity: p(local, at, 10) }}>
      <Stage color={interpolate(bg, [0, 1], [0, 1], clamp) > 0.5 ? paper : blue} grid={false} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: paper,
          opacity: bg,
        }}
      />
      <Img
        src={staticFile("logo/haru-symbol.svg")}
        style={{
          position: "absolute",
          left: "50%",
          top: 420,
          width: 360,
          opacity: 1,
          transform: `translate(-50%, -50%) rotate(${interpolate(
            zoom,
            [0, 1],
            [-8, 0],
            clamp,
          )}deg) scale(${interpolate(zoom, [0, 1], [13.5, 1], clamp)})`,
          transformOrigin: "center",
          filter: "drop-shadow(0 34px 100px rgba(44,122,252,.18))",
        }}
      />
      <Img
        src={staticFile("logo/haru-horizontal.svg")}
        style={{
          position: "absolute",
          left: "50%",
          top: 685,
          width: 430,
          opacity: name,
          transform: `translateX(-50%) translateY(${(1 - name) * 30}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

const ColorPush: React.FC<{
  local: number;
  at: number;
  color: string;
  from?: "center" | "bottom";
}> = ({ local, at, color, from = "center" }) => {
  const grow = p(local, at, 30, soft);
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: from === "center" ? "50%" : "100%",
        width: 2600,
        height: 2600,
        borderRadius: 2600,
        background: color,
        transform: `translate(-50%, -50%) scale(${grow})`,
      }}
    />
  );
};

const ReportToRecordBridge: React.FC<{ local: number; at: number }> = ({ local, at }) => {
  const card = p(local, at, 18, snap);
  const sweep = p(local, at + 20, 34, soft);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: interpolate(sweep, [0, 1], [620, 540], clamp),
          width: interpolate(sweep, [0, 1], [420, 2500], clamp),
          height: interpolate(sweep, [0, 1], [150, 2500], clamp),
          borderRadius: interpolate(sweep, [0, 1], [36, 1250], clamp),
          background: "#fff",
          boxShadow: "0 36px 100px rgba(16,24,39,.16)",
          opacity: card,
          transform: `translate(-50%, -50%) scale(${0.94 + card * 0.06})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 620,
          opacity: interpolate(local, [at, at + 12, at + 34], [0, 1, 0], clamp),
          transform: "translate(-50%, -50%)",
          fontFamily,
          fontSize: 42,
          fontWeight: 900,
          color: green,
        }}
      >
        기록으로 저장
      </div>
    </>
  );
};

const EmergencyBloom: React.FC<{ local: number; at: number }> = ({ local, at }) => {
  const appear = p(local, at, 16, snap);
  const grow = p(local, at + 28, 34, soft);
  const labelOut = interpolate(local, [at + 34, at + 48], [1, 0], clamp);
  const width = interpolate(grow, [0, 1], [340, 2700], clamp);
  const height = interpolate(grow, [0, 1], [132, 2700], clamp);
  const radius = interpolate(grow, [0, 1], [32, 1350], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 330,
        width,
        height,
        borderRadius: radius,
        background: red,
        boxShadow: "0 30px 90px rgba(239,45,45,.42)",
        opacity: appear,
        transform: `translate(-50%, -50%) scale(${0.9 + appear * 0.1})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        color: "#fff",
        fontWeight: 900,
        fontSize: 44,
        letterSpacing: 0,
        overflow: "hidden",
      }}
    >
      <span style={{ opacity: appear * labelOut, whiteSpace: "nowrap" }}>긴급 알림</span>
    </div>
  );
};

const AlertToQuestionBridge: React.FC<{ local: number; at: number }> = ({ local, at }) => {
  const appear = p(local, at, 14, snap);
  const grow = p(local, at + 22, 34, soft);
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: interpolate(grow, [0, 1], [815, 540], clamp),
        width: interpolate(grow, [0, 1], [130, 2700], clamp),
        height: interpolate(grow, [0, 1], [130, 2700], clamp),
        borderRadius: interpolate(grow, [0, 1], [65, 1350], clamp),
        background: dark,
        boxShadow: "0 30px 90px rgba(6,11,24,.36)",
        opacity: appear,
        transform: `translate(-50%, -50%) scale(${0.9 + appear * 0.1})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily,
        fontSize: 48,
        fontWeight: 900,
        overflow: "hidden",
      }}
    >
      <span style={{ opacity: interpolate(local, [at + 4, at + 16, at + 32], [0, 1, 0], clamp), whiteSpace: "nowrap" }}>
        AI 질문
      </span>
    </div>
  );
};

export const HaruAnbuPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily, background: paper }}>
      <Scene start={0} end={150}>
        {(local) => (
          <>
            <Stage />
            <BigType local={local} at={8} exitAt={96} text="부모님 안부" y={230} size={176} />
            <BigType local={local} at={38} exitAt={104} text="전화 한 통으론" y={415} size={132} color="#7A8798" />
            <BigType local={local} at={68} exitAt={112} text="부족하니까" y={560} size={176} color={blue} />
            <ColorPush local={local} at={112} color={blue} from="center" />
          </>
        )}
      </Scene>

      <Scene start={150} end={270}>
        {(local) => (
          <>
            <Stage color={blue} />
            <BigType local={local} at={8} exitAt={58} text="안부가" y={250} size={220} color="#fff" />
            <BigType local={local} at={38} exitAt={70} text="보인다" y={500} size={228} color="#DFF7FF" />
            <LogoZoomBridge local={local} at={70} />
          </>
        )}
      </Scene>

      <Scene start={270} end={465}>
        {(local) => (
          <>
            <Stage />
            <LogoToSearchBridge local={local} at={0} />
            <BigType local={local} at={0} exitAt={58} text="AI 일일 리포트" y={120} size={118} color={blue} />
            <SearchToAnswer
              local={local}
              at={42}
              query="오늘 부모님 컨디션 어때?"
              answer="식사, 활동, 기분 변화를 하루 요약으로"
              exitAt={143}
            />
            <Phone local={local} at={145} image="screens/home.png" scale={1.04} rotate={-2} />
            <ReportToRecordBridge local={local} at={146} />
          </>
        )}
      </Scene>

      <Scene start={465} end={615}>
        {(local) => (
          <>
            <Stage />
            <BigType local={local} at={0} exitAt={52} text="돌봄 체크는" y={245} size={142} />
            <BigType local={local} at={34} exitAt={76} text="기록으로 남고" y={415} size={166} color={green} />
            <Phone local={local} at={78} image="screens/records.png" scale={1.03} rotate={2} />
            <EmergencyBloom local={local} at={112} />
          </>
        )}
      </Scene>

      <Scene start={615} end={735}>
        {(local) => (
          <>
            <Stage color={red} />
            <BigType local={local} at={2} exitAt={54} text="SOS" y={210} size={290} color="#fff" />
            <BigType local={local} at={42} exitAt={75} text="바로 보호자에게" y={540} size={128} color="#FFE2DD" />
            <Phone local={local} at={76} image="screens/alert.png" scale={0.98} rotate={-2} />
            <AlertToQuestionBridge local={local} at={96} />
          </>
        )}
      </Scene>

      <Scene start={735} end={930}>
        {(local) => (
          <>
            <Stage color={dark} />
            <BigType local={local} at={0} exitAt={42} text="요양 정보도" y={180} size={128} color="#fff" />
            <SearchToAnswer
              local={local}
              at={36}
              query="장기요양 등급 신청은?"
              answer="필요한 절차와 다음 행동을 쉽게 정리"
              color={sky}
              exitAt={128}
            />
            <Phone local={local} at={140} image="screens/chat-ai.png" scale={0.98} rotate={2} />
          </>
        )}
      </Scene>

      <Scene start={930} end={990}>
        {(local) => (
          <>
            <Stage />
            <Img
              src={staticFile("logo/haru-horizontal.svg")}
              style={{
                position: "absolute",
                left: "50%",
                top: 280,
                width: 700,
                opacity: p(local, 0, 16),
                transform: `translateX(-50%) scale(${0.92 + p(local, 0, 18, snap) * 0.08})`,
                filter: "drop-shadow(0 28px 70px rgba(44,122,252,.14))",
              }}
            />
            <BigType local={local} at={10} text="오늘 하루도, 안녕하셨습니다" y={640} size={74} />
          </>
        )}
      </Scene>
    </AbsoluteFill>
  );
};
