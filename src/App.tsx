import { useMemo, useState, type ReactNode } from "react";

type Lesson = {
  id: number;
  title: string;
  description: string;
  subjects: { name: string; tone: string }[];
  grade: string;
  time: string;
  teacher: string;
  rating: string;
  saves: number;
  accent: string;
  visual: ReactNode;
};

const lessons: Lesson[] = [
  {
    id: 1,
    title: "소리의 파동과 음악의 화음",
    description: "파동의 중첩과 주파수 비를 실험하며 협화음의 원리를 탐구하는 참여형 수업",
    subjects: [
      { name: "물리학", tone: "indigo" },
      { name: "음악", tone: "coral" },
    ],
    grade: "영재학교 1학년",
    time: "50분",
    teacher: "김하늘 선생님",
    rating: "4.9",
    saves: 284,
    accent: "blue",
    visual: <WaveVisual />,
  },
  {
    id: 2,
    title: "게임이론으로 설계하는 합리적 선택",
    description: "죄수의 딜레마와 반복 게임을 통해 개인의 선택과 사회적 효율을 분석합니다.",
    subjects: [
      { name: "수학", tone: "blue" },
      { name: "경제학", tone: "amber" },
    ],
    grade: "고등 1–2학년",
    time: "2차시",
    teacher: "이도윤 선생님",
    rating: "4.8",
    saves: 197,
    accent: "amber",
    visual: <MatrixVisual />,
  },
  {
    id: 3,
    title: "대칭과 프랙탈, 자연이 만든 아름다움",
    description: "수학적 규칙을 발견하고 나만의 생성형 패턴 작품을 만드는 프로젝트 수업",
    subjects: [
      { name: "수학", tone: "blue" },
      { name: "미술", tone: "coral" },
    ],
    grade: "고등 전학년",
    time: "4차시",
    teacher: "박서연 선생님",
    rating: "4.9",
    saves: 243,
    accent: "purple",
    visual: <FractalVisual />,
  },
];

const themes = [
  {
    icon: "atom",
    subjects: "물리학 × 체육",
    title: "스포츠 속 포물선 운동",
    count: 12,
    tone: "indigo",
  },
  {
    icon: "leaf",
    subjects: "생명과학 × 문학",
    title: "사랑의 생물학과 문학적 표현",
    count: 8,
    tone: "green",
  },
  {
    icon: "palette",
    subjects: "화학 × 미술",
    title: "색채와 안료의 화학",
    count: 15,
    tone: "coral",
  },
  {
    icon: "cpu",
    subjects: "정보과학 × 철학",
    title: "인공지능과 윤리적 판단",
    count: 21,
    tone: "purple",
  },
];

const curricula = [
  {
    name: "수학",
    icon: "function",
    detail: "대수 · 해석 · 기하 · 확률과 통계",
    count: 48,
    tone: "blue",
  },
  {
    name: "물리학",
    icon: "atom",
    detail: "역학 · 전자기 · 파동 · 현대물리",
    count: 36,
    tone: "indigo",
  },
  {
    name: "화학",
    icon: "flask",
    detail: "물질 · 반응 · 에너지 · 화학 평형",
    count: 31,
    tone: "coral",
  },
  {
    name: "생명과학",
    icon: "leaf",
    detail: "세포 · 유전 · 생태 · 항상성",
    count: 29,
    tone: "green",
  },
  {
    name: "정보과학",
    icon: "cpu",
    detail: "알고리즘 · 데이터 · AI · 컴퓨팅",
    count: 42,
    tone: "purple",
  },
];

const recentPlans = [
  {
    title: "운동과 인체의 에너지 대사",
    pair: "생명과학 × 체육",
    teacher: "정민재",
    ago: "2시간 전",
    saves: 32,
    tone: "green",
  },
  {
    title: "도시의 온도를 낮추는 수학",
    pair: "수학 × 환경",
    teacher: "윤가은",
    ago: "어제",
    saves: 24,
    tone: "blue",
  },
  {
    title: "별의 스펙트럼을 시로 읽기",
    pair: "물리학 × 문학",
    teacher: "최유진",
    ago: "2일 전",
    saves: 19,
    tone: "purple",
  },
];

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
  const paths: Record<string, ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    bookmark: <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.5L6 21z" />,
    star: <path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.8M16 3.2a4 4 0 0 1 0 7.6" />
      </>
    ),
    function: <path d="M6 20c4-2 4-14 8-16 2.5-1.3 4 .2 4 .2M5 11h9" />,
    atom: (
      <>
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C12 4 5 7 5 14c0 3 2 5 5 5 7 0 10-7 10-15Z" />
        <path d="M4 21c3-6 7-9 12-12" />
      </>
    ),
    flask: (
      <>
        <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
        <path d="M7 15h10" />
      </>
    ),
    cpu: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M9 1v3m6-3v3M9 20v3m6-3v3M1 9h3m-3 6h3m16-6h3m-3 6h3" />
        <rect x="9" y="9" width="6" height="6" />
      </>
    ),
    palette: (
      <>
        <path d="M12 3a9 9 0 0 0 0 18h1.5a1.5 1.5 0 0 0 1.1-2.5 1.5 1.5 0 0 1 1.1-2.5H18a3 3 0 0 0 3-3c0-5.5-4-10-9-10Z" />
        <circle cx="7.5" cy="11" r=".8" fill="currentColor" />
        <circle cx="10" cy="7" r=".8" fill="currentColor" />
        <circle cx="15" cy="7.5" r=".8" fill="currentColor" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    x: <path d="m6 6 12 12M18 6 6 18" />,
    comment: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </>
    ),
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function WaveVisual() {
  return (
    <svg viewBox="0 0 330 148" className="visual-svg" aria-hidden="true">
      <defs>
        <linearGradient id="wave" x1="0" x2="1">
          <stop stopColor="#4f46e5" />
          <stop offset="1" stopColor="#16a6a1" />
        </linearGradient>
      </defs>
      {[22, 45, 68, 91, 114].map((y) => (
        <line key={y} x1="34" y1={y} x2="295" y2={y} stroke="#dbe4ee" strokeWidth="1" />
      ))}
      <path
        d="M25 73c20-54 39 54 59 0s39 54 59 0 39 54 59 0 39 54 59 0 39 54 59 0"
        fill="none"
        stroke="url(#wave)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="74" cy="20" r="7" fill="#ff8c75" opacity=".75" />
      <circle cx="257" cy="125" r="5" fill="#25b5aa" opacity=".55" />
    </svg>
  );
}

function MatrixVisual() {
  return (
    <div className="matrix-visual">
      <div className="matrix-bracket">(</div>
      <div className="matrix-grid">
        <span>3, 3</span>
        <span>0, 5</span>
        <span>5, 0</span>
        <span>1, 1</span>
      </div>
      <div className="matrix-bracket">)</div>
    </div>
  );
}

function FractalVisual() {
  return (
    <svg viewBox="0 0 330 148" className="visual-svg" aria-hidden="true">
      <g fill="none" stroke="#7c65d9" strokeWidth="1.5" opacity=".82">
        <circle cx="165" cy="74" r="44" />
        <circle cx="165" cy="30" r="22" />
        <circle cx="165" cy="118" r="22" />
        <circle cx="121" cy="74" r="22" />
        <circle cx="209" cy="74" r="22" />
        <circle cx="143" cy="52" r="11" />
        <circle cx="187" cy="52" r="11" />
        <circle cx="143" cy="96" r="11" />
        <circle cx="187" cy="96" r="11" />
      </g>
    </svg>
  );
}

function Badge({ subject }: { subject: { name: string; tone: string } }) {
  return <span className={`badge badge-${subject.tone}`}>{subject.name}</span>;
}

function App() {
  const [activeNav, setActiveNav] = useState("홈");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [saved, setSaved] = useState<number[]>([]);
  const [toast, setToast] = useState("");

  const searchResults = useMemo(() => {
    if (!query.trim()) return lessons;
    return lessons.filter((lesson) =>
      `${lesson.title} ${lesson.description} ${lesson.subjects.map((s) => s.name).join(" ")}`.includes(
        query.trim(),
      ),
    );
  }, [query]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const toggleSave = (id: number) => {
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
    notify(saved.includes(id) ? "보관함에서 삭제했어요." : "내 보관함에 저장했어요.");
  };

  const goHomeSection = (name: string) => {
    setActiveNav(name);
    if (name === "교육과정별 탐색") return;
    window.setTimeout(() => {
      if (name === "홈") window.scrollTo({ top: 0, behavior: "smooth" });
      else
        document
          .getElementById(name === "융합 주제 탐색" ? "themes" : "library")
          ?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="nav-wrap">
          <button className="brand" onClick={() => goHomeSection("홈")} aria-label="융합교육 홈">
            <span className="brand-mark">
              <i />
              <i />
              <i />
            </span>
            <span>
              융합교육 <b>Courseware</b>
            </span>
          </button>
          <nav aria-label="주요 메뉴">
            {["홈", "교육과정별 탐색", "융합 주제 탐색", "내 보관함"].map((item) => (
              <button
                key={item}
                className={activeNav === item ? "active" : ""}
                onClick={() => goHomeSection(item)}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="icon-button notification" aria-label="알림">
              <Icon name="bell" size={19} />
              <span />
            </button>
            <button className="create-button" onClick={() => setEditorOpen(true)}>
              <Icon name="plus" size={18} />
              수업안 만들기
            </button>
            <button className="profile" aria-label="교사 프로필">
              <span>서</span>
              <div>
                <b>서지윤</b>
                <small>물리 교사</small>
              </div>
              <span className="profile-caret">⌄</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="hero-content">
            <div className="eyebrow">
              <span>
                <Icon name="atom" size={14} />
              </span>
              교과의 경계를 넘어, 배움의 연결을 발견하세요
            </div>
            <h1>
              아이디어가 수업이 되는
              <br />
              <em>융합교육의 시작</em>
            </h1>
            <p>
              영재학교 선생님을 위한 교과 연결 아이디어와 검증된 수업안을 만나보세요.
              <br />
              탐색부터 수업 준비까지, 더 깊이 있는 배움을 함께 만듭니다.
            </p>
            <form
              className={`global-search ${searchOpen ? "focused" : ""}`}
              onSubmit={(e) => {
                e.preventDefault();
                setSearchOpen(true);
              }}
            >
              <Icon name="search" size={22} />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="교과, 단원, 융합 주제로 수업안을 검색해 보세요"
                aria-label="수업안 검색"
              />
              <button>검색</button>
              {searchOpen && query && (
                <div className="search-dropdown">
                  <div className="search-label">
                    검색 결과 <b>{searchResults.length}</b>
                  </div>
                  {searchResults.length ? (
                    searchResults.map((lesson) => (
                      <button
                        type="button"
                        key={lesson.id}
                        onClick={() => {
                          setSelectedLesson(lesson);
                          setSearchOpen(false);
                        }}
                      >
                        <span className={`result-dot ${lesson.accent}`} />
                        <span>
                          <b>{lesson.title}</b>
                          <small>
                            {lesson.subjects.map((s) => s.name).join(" × ")} · {lesson.time}
                          </small>
                        </span>
                        <Icon name="chevron" size={16} />
                      </button>
                    ))
                  ) : (
                    <div className="no-result">
                      일치하는 수업안이 없습니다. 다른 키워드로 찾아보세요.
                    </div>
                  )}
                </div>
              )}
            </form>
            <div className="popular">
              <b>인기 검색어</b>
              {["파동과 음악", "AI 윤리", "게임이론", "프랙탈"].map((word) => (
                <button
                  key={word}
                  onClick={() => {
                    setQuery(word);
                    setSearchOpen(true);
                  }}
                >
                  #{word}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="curriculum-section" id="curriculum">
          <div className="section">
            <div className="section-heading">
              <div>
                <span className="kicker teal">CURRICULUM</span>
                <h2>교육과정에서 바로 시작하세요</h2>
                <p>담당 교과와 단원을 선택하면 연결할 수 있는 융합 수업안을 찾아드려요.</p>
              </div>
              <button className="text-link" onClick={() => setActiveNav("교육과정별 탐색")}>
                교육과정 전체 보기 <Icon name="arrow" size={17} />
              </button>
            </div>
            <div className="curriculum-grid">
              {curricula.map((item) => (
                <button
                  className="curriculum-card"
                  key={item.name}
                  onClick={() => {
                    setQuery(item.name);
                    setSearchOpen(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <span className={`curriculum-icon tone-${item.tone}`}>
                    <Icon name={item.icon} size={25} />
                  </span>
                  <span>
                    <b>{item.name}</b>
                    <small>{item.detail}</small>
                    <em>융합 수업안 {item.count}개</em>
                  </span>
                  <Icon name="chevron" size={18} className="card-chevron" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section theme-section" id="themes">
          <div className="section-heading">
            <div>
              <span className="kicker coral">CROSSOVER TOPICS</span>
              <h2>지금 주목받는 융합 주제</h2>
              <p>서로 다른 교과가 만나는 흥미로운 지점을 발견해 보세요.</p>
            </div>
            <button className="text-link">
              모든 융합 주제 <Icon name="arrow" size={17} />
            </button>
          </div>
          <div className="theme-grid">
            {themes.map((theme) => (
              <button
                className="theme-card"
                key={theme.title}
                onClick={() => {
                  setQuery(theme.title.split(" ")[0]);
                  setSearchOpen(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <span className={`theme-icon tone-${theme.tone}`}>
                  <Icon name={theme.icon} size={26} />
                </span>
                <span className="theme-copy">
                  <small>{theme.subjects}</small>
                  <b>{theme.title}</b>
                  <em>관련 수업안 {theme.count}개</em>
                </span>
                <span className="round-arrow">
                  <Icon name="arrow" size={16} />
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="community-section" id="library">
          <div className="section community-inner">
            <div className="community-copy">
              <span className="kicker purple">TEACHER COMMUNITY</span>
              <h2>
                선생님의 수업 경험이
                <br />또 다른 배움이 됩니다
              </h2>
              <p>
                직접 만든 융합 수업안을 공유하고, 동료 교사의
                <br />
                피드백으로 함께 발전시켜 보세요.
              </p>
              <button className="outline-button" onClick={() => setEditorOpen(true)}>
                <Icon name="plus" size={17} /> 내 수업안 공유하기
              </button>
              <div className="community-stats">
                <span>
                  <b>1,248</b>
                  <small>공유된 수업안</small>
                </span>
                <i />
                <span>
                  <b>3,560</b>
                  <small>함께하는 선생님</small>
                </span>
              </div>
            </div>
            <div className="recent-panel">
              <div className="recent-head">
                <b>최근 공유된 수업안</b>
                <button>
                  더보기 <Icon name="chevron" size={14} />
                </button>
              </div>
              {recentPlans.map((plan) => (
                <button className="recent-item" key={plan.title}>
                  <span className={`recent-icon tone-${plan.tone}`}>
                    <Icon
                      name={
                        plan.tone === "green" ? "leaf" : plan.tone === "blue" ? "function" : "star"
                      }
                      size={20}
                    />
                  </span>
                  <span className="recent-copy">
                    <small>{plan.pair}</small>
                    <b>{plan.title}</b>
                    <em>
                      {plan.teacher} 선생님 · {plan.ago}
                    </em>
                  </span>
                  <span className="recent-save">
                    <Icon name="bookmark" size={14} />
                    {plan.saves}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <div className="brand muted">
            <span className="brand-mark">
              <i />
              <i />
              <i />
            </span>
            <span>
              융합교육 <b>Courseware</b>
            </span>
          </div>
          <p>교과의 연결에서 시작하는 새로운 배움</p>
          <div>
            <button>서비스 소개</button>
            <button>이용안내</button>
            <button>의견 보내기</button>
          </div>
        </div>
      </footer>

      {activeNav === "교육과정별 탐색" && (
        <CurriculumExplorer
          onOpenLesson={(lesson) => setSelectedLesson(lesson)}
          onBack={() => goHomeSection("홈")}
        />
      )}
      {editorOpen && <LessonEditor onClose={() => setEditorOpen(false)} onNotify={notify} />}
      {selectedLesson && (
        <LessonDetail
          lesson={selectedLesson}
          saved={saved.includes(selectedLesson.id)}
          onSave={() => toggleSave(selectedLesson.id)}
          onClose={() => setSelectedLesson(null)}
          onNotify={notify}
        />
      )}
      {toast && (
        <div className="toast">
          <span>
            <Icon name="check" size={16} />
          </span>
          {toast}
        </div>
      )}
    </div>
  );
}

const editorSteps = [
  { title: "기본 정보", short: "수업의 기본 내용을 입력해요" },
  { title: "융합 개념 및 학습 목표", short: "교과 간 연결을 설계해요" },
  { title: "교수학습과정안", short: "50분 수업 흐름을 구성해요" },
  { title: "학생 활동 및 수업 자료", short: "탐구 활동과 자료를 준비해요" },
  { title: "평가 및 공유 설정", short: "평가 기준과 공개 범위를 정해요" },
];

function LessonEditor({
  onClose,
  onNotify,
}: {
  onClose: () => void;
  onNotify: (message: string) => void;
}) {
  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    grade: "영재학교 1학년",
    primary: "물리학",
    secondary: "음악",
    unit: "파동 — 소리의 성질",
    duration: "50분",
    type: "탐구·실험 중심",
    intro: "",
    primaryConcept: "주파수, 파장, 공명, 배음",
    secondaryConcept: "음정, 화음, 협화와 불협화",
    connection: "",
    objectives: "",
    prerequisite: "",
    activityName: "",
    activityPurpose: "",
    procedure: "",
    question: "",
    output: "",
    extension: "",
    assessment: "",
    criteria: "",
    notes: "",
    visibility: "전체 공개",
    tags: "물리학, 음악, 파동",
  });
  const [stages, setStages] = useState([
    { name: "도입", time: "5분", teacher: "", student: "", materials: "", note: "" },
    { name: "개념 탐구", time: "10분", teacher: "", student: "", materials: "", note: "" },
    { name: "학생 주도 탐구", time: "25분", teacher: "", student: "", materials: "", note: "" },
    { name: "정리 및 성찰", time: "10분", teacher: "", student: "", materials: "", note: "" },
  ]);

  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  const next = () => {
    if (step === 0 && !form.title.trim()) {
      setError("수업 제목은 꼭 입력해 주세요.");
      return;
    }
    setError("");
    if (step < editorSteps.length - 1) setStep(step + 1);
  };
  const updateStage = (index: number, key: string, value: string) =>
    setStages((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)),
    );
  const moveStage = (index: number, direction: number) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= stages.length) return;
    setStages((current) => {
      const copy = [...current];
      [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
      return copy;
    });
  };

  const Field = ({
    label,
    field,
    placeholder,
    multiline = false,
    hint,
  }: {
    label: string;
    field: keyof typeof form;
    placeholder?: string;
    multiline?: boolean;
    hint?: string;
  }) => (
    <label className={`editor-field ${multiline ? "wide" : ""}`}>
      <span>{label}</span>
      {multiline ? (
        <textarea
          value={form[field]}
          onChange={(event) => update(field, event.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          value={form[field]}
          onChange={(event) => update(field, event.target.value)}
          placeholder={placeholder}
        />
      )}
      {hint && <small>{hint}</small>}
    </label>
  );

  return (
    <div className="editor-overlay" role="dialog" aria-modal="true" aria-label="수업안 만들기">
      <header className="editor-top">
        <button className="detail-brand" onClick={onClose}>
          <span className="brand-mark">
            <i />
            <i />
            <i />
          </span>
          수업안 만들기
        </button>
        <div className="editor-top-actions">
          <span>마지막 저장 방금 전</span>
          <button
            className="editor-ghost"
            onClick={() => onNotify("작성 중인 수업안을 임시 저장했어요.")}
          >
            임시 저장
          </button>
          <button className="editor-preview-button" onClick={() => setPreview(!preview)}>
            <Icon name="search" size={15} />
            {preview ? "편집으로 돌아가기" : "미리보기"}
          </button>
          <button className="close-button" onClick={onClose} aria-label="편집기 닫기">
            <Icon name="x" size={21} />
          </button>
        </div>
      </header>

      <div className="editor-progress">
        {editorSteps.map((item, index) => (
          <button
            className={`${index === step ? "active" : ""} ${index < step ? "complete" : ""}`}
            onClick={() => setStep(index)}
            key={item.title}
          >
            <span>{index < step ? <Icon name="check" size={13} /> : index + 1}</span>
            <div>
              <small>STEP {index + 1}</small>
              <b>{item.title}</b>
            </div>
            {index < editorSteps.length - 1 && <i />}
          </button>
        ))}
      </div>

      <div className={`editor-workspace ${preview ? "preview-mode" : ""}`}>
        {!preview && (
          <main className="editor-form">
            <div className="editor-form-heading">
              <span>STEP {step + 1}</span>
              <h1>{editorSteps[step].title}</h1>
              <p>{editorSteps[step].short}. 작성 내용은 언제든 수정할 수 있어요.</p>
            </div>

            {step === 0 && (
              <div className="editor-fields">
                <Field
                  label="수업 제목 *"
                  field="title"
                  placeholder="예: 소리의 파동과 음악의 화음"
                />
                <Field label="대상 학년" field="grade" />
                <Field label="기준 교과" field="primary" />
                <Field label="융합 교과" field="secondary" />
                <Field label="교육과정 단원" field="unit" />
                <Field label="예상 수업 시간" field="duration" />
                <Field label="수업 유형" field="type" />
                <Field
                  label="수업 소개"
                  field="intro"
                  multiline
                  placeholder="선생님들이 수업의 핵심을 빠르게 이해할 수 있도록 소개해 주세요."
                  hint="수업의 교육적 의미와 학생들이 경험할 활동을 함께 적어보세요."
                />
              </div>
            )}
            {step === 1 && (
              <div className="editor-fields">
                <Field label="기준 교과 핵심 개념" field="primaryConcept" />
                <Field label="융합 교과 핵심 개념" field="secondaryConcept" />
                <Field
                  label="교과 간 연결 설명"
                  field="connection"
                  multiline
                  placeholder="두 교과의 개념이 수업 안에서 어떻게 연결되는지 설명해 주세요."
                />
                <Field
                  label="학습 목표"
                  field="objectives"
                  multiline
                  placeholder={
                    "학생은 주파수와 음높이의 관계를 설명할 수 있다.\n학생은 배음과 공명 현상으로 악기의 소리를 분석할 수 있다."
                  }
                />
                <Field
                  label="선수학습 요소"
                  field="prerequisite"
                  multiline
                  placeholder="수업 전 학생들이 알고 있어야 할 개념을 적어주세요."
                />
              </div>
            )}
            {step === 2 && (
              <div className="stage-editor">
                <div className="stage-summary">
                  <b>수업 단계 {stages.length}개</b>
                  <span>
                    총{" "}
                    {stages.reduce((total, item) => total + Number.parseInt(item.time || "0"), 0)}분
                  </span>
                </div>
                {stages.map((stage, index) => (
                  <article className="stage-form" key={`${stage.name}-${index}`}>
                    <div className="stage-form-head">
                      <span>{index + 1}</span>
                      <input
                        value={stage.name}
                        aria-label="단계명"
                        onChange={(event) => updateStage(index, "name", event.target.value)}
                      />
                      <input
                        className="stage-time"
                        value={stage.time}
                        aria-label="소요 시간"
                        onChange={(event) => updateStage(index, "time", event.target.value)}
                      />
                      <button onClick={() => moveStage(index, -1)} aria-label="위로 이동">
                        ↑
                      </button>
                      <button onClick={() => moveStage(index, 1)} aria-label="아래로 이동">
                        ↓
                      </button>
                      <button
                        onClick={() =>
                          setStages((current) =>
                            current.filter((_, itemIndex) => itemIndex !== index),
                          )
                        }
                        aria-label="단계 삭제"
                      >
                        <Icon name="x" size={15} />
                      </button>
                    </div>
                    <div className="stage-fields">
                      {[
                        ["teacher", "교사 활동"],
                        ["student", "학생 활동"],
                        ["materials", "준비물"],
                        ["note", "지도 시 유의사항"],
                      ].map(([key, label]) => (
                        <label key={key}>
                          <span>{label}</span>
                          <textarea
                            value={stage[key as keyof typeof stage]}
                            onChange={(event) => updateStage(index, key, event.target.value)}
                            placeholder={`${label}을 입력해 주세요.`}
                          />
                        </label>
                      ))}
                    </div>
                  </article>
                ))}
                <button
                  className="add-stage"
                  onClick={() =>
                    setStages((current) => [
                      ...current,
                      {
                        name: "새 단계",
                        time: "5분",
                        teacher: "",
                        student: "",
                        materials: "",
                        note: "",
                      },
                    ])
                  }
                >
                  <Icon name="plus" size={16} /> 수업 단계 추가
                </button>
              </div>
            )}
            {step === 3 && (
              <div className="editor-fields">
                <Field
                  label="활동명"
                  field="activityName"
                  placeholder="예: 화음을 눈으로 관찰하기"
                />
                <Field label="활동 목적" field="activityPurpose" />
                <Field label="활동 절차" field="procedure" multiline />
                <Field label="탐구 질문" field="question" multiline />
                <Field label="예상 결과물" field="output" multiline />
                <Field
                  label="심화 활동"
                  field="extension"
                  multiline
                  placeholder="서로 다른 악기의 배음 구조를 분석하고, 음색 차이를 설명하는 모델을 설계해보세요."
                />
                <button
                  className="resource-upload"
                  onClick={() => onNotify("프로토타입에서는 파일 첨부 화면만 제공해요.")}
                >
                  <Icon name="plus" size={17} />
                  <span>
                    <b>수업 자료 첨부</b>
                    <small>교사용 자료, 활동지, 시뮬레이션 링크를 추가하세요.</small>
                  </span>
                </button>
              </div>
            )}
            {step === 4 && (
              <div className="editor-fields">
                <Field
                  label="평가 방법"
                  field="assessment"
                  multiline
                  placeholder="관찰 평가, 모둠 산출물 평가, 자기 성찰 등"
                />
                <Field
                  label="평가 기준"
                  field="criteria"
                  multiline
                  placeholder="추론, 탐구, 창의성, 융합적 이해를 중심으로 작성해 주세요."
                />
                <Field label="교사 참고사항" field="notes" multiline />
                <Field label="공개 여부" field="visibility" />
                <Field label="태그" field="tags" hint="쉼표로 구분해 주세요." />
                <div className="publish-check">
                  <span>
                    <Icon name="check" size={16} />
                  </span>
                  <div>
                    <b>게시 전 확인</b>
                    <p>학생 개인정보나 저작권이 있는 자료가 포함되지 않았는지 확인해 주세요.</p>
                  </div>
                </div>
              </div>
            )}
            {error && <div className="editor-error">{error}</div>}
            <div className="editor-navigation">
              <button
                className="editor-back"
                disabled={step === 0}
                onClick={() => setStep(Math.max(0, step - 1))}
              >
                이전
              </button>
              {step < editorSteps.length - 1 ? (
                <button className="editor-next" onClick={next}>
                  다음 단계 <Icon name="arrow" size={16} />
                </button>
              ) : (
                <button
                  className="editor-next"
                  onClick={() => {
                    onNotify("수업안이 성공적으로 게시되었어요.");
                    onClose();
                  }}
                >
                  수업안 게시하기
                </button>
              )}
            </div>
          </main>
        )}

        <aside className={`editor-live-preview ${preview ? "full" : ""}`}>
          <div className="preview-label">
            <span>LIVE PREVIEW</span>
            <em>수업안 미리보기</em>
          </div>
          <div className="preview-card">
            <div className="preview-visual">
              <WaveVisual />
            </div>
            <div className="badge-row">
              <Badge subject={{ name: form.primary || "기준 교과", tone: "indigo" }} />
              <Badge subject={{ name: form.secondary || "융합 교과", tone: "coral" }} />
            </div>
            <h2>{form.title || "수업 제목을 입력해 주세요"}</h2>
            <p>{form.intro || "작성한 수업 소개가 이곳에 표시됩니다."}</p>
            <div className="preview-meta">
              <span>
                <Icon name="users" size={14} />
                {form.grade}
              </span>
              <span>
                <Icon name="clock" size={14} />
                {form.duration}
              </span>
              <span>
                <Icon name="atom" size={14} />
                {form.type}
              </span>
            </div>
            <hr />
            <b>수업 흐름</b>
            <div className="preview-stages">
              {stages.map((item, index) => (
                <div key={`${item.name}-${index}`}>
                  <span>{index + 1}</span>
                  <b>{item.name}</b>
                  <em>{item.time}</em>
                </div>
              ))}
            </div>
            <div className="preview-tip">
              <Icon name="check" size={15} />
              오른쪽 미리보기는 입력과 동시에 업데이트됩니다.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

const curriculumUnits = [
  {
    name: "파동",
    count: 13,
    topics: [
      { name: "파동의 기본 성질", count: 4 },
      { name: "소리의 성질", count: 6 },
      { name: "빛의 간섭과 회절", count: 3 },
    ],
  },
  {
    name: "역학과 에너지",
    count: 18,
    topics: [
      { name: "운동과 힘", count: 7 },
      { name: "역학적 에너지", count: 5 },
      { name: "운동량과 충돌", count: 6 },
    ],
  },
  {
    name: "전자기",
    count: 11,
    topics: [
      { name: "전기장과 전위", count: 4 },
      { name: "전자기 유도", count: 5 },
      { name: "전자기파", count: 2 },
    ],
  },
  {
    name: "현대 물리",
    count: 9,
    topics: [
      { name: "빛과 물질의 이중성", count: 4 },
      { name: "원자와 스펙트럼", count: 5 },
    ],
  },
];

function CurriculumExplorer({
  onOpenLesson,
  onBack,
}: {
  onOpenLesson: (lesson: Lesson) => void;
  onBack: () => void;
}) {
  const [grade, setGrade] = useState("2학년");
  const [subject, setSubject] = useState("물리학");
  const [school, setSchool] = useState("공통 예시 교육과정");
  const [openUnit, setOpenUnit] = useState("파동");
  const [topic, setTopic] = useState("소리의 성질");

  const resultLessons = [
    {
      lesson: lessons[0],
      title: "소리의 파동과 음악의 화음",
      description: "파동의 중첩과 주파수 비를 실험하며 협화음의 원리를 탐구합니다.",
      pair: "물리학 × 음악",
      activity: "모둠 실험",
      tone: "indigo",
    },
    {
      lesson: lessons[0],
      title: "악기의 구조와 공명 현상",
      description: "현악기와 관악기의 구조를 비교하고 공명 조건을 직접 측정합니다.",
      pair: "물리학 × 음악 · 공학",
      activity: "제작 프로젝트",
      tone: "coral",
    },
    {
      lesson: lessons[1],
      title: "디지털 음악과 푸리에 분석",
      description: "복잡한 소리를 주파수 성분으로 분해하며 데이터 분석 원리를 익힙니다.",
      pair: "물리학 × 정보과학",
      activity: "데이터 탐구",
      tone: "purple",
    },
  ];

  return (
    <div className="explorer-page">
      <div className="explorer-heading">
        <div className="explorer-heading-inner">
          <div>
            <button className="breadcrumb-home" onClick={onBack}>
              홈
            </button>
            <span>/</span>
            <b>교육과정별 탐색</b>
          </div>
          <h1>교육과정에서 융합의 실마리를 찾아보세요</h1>
          <p>
            현재 가르치는 학년과 단원을 선택하면 바로 활용할 수 있는 융합 수업안을 연결해 드립니다.
          </p>
        </div>
      </div>

      <div className="explorer-layout">
        <aside className="filter-sidebar">
          <div className="filter-title">
            <b>교육과정 필터</b>
            <button
              onClick={() => {
                setGrade("2학년");
                setSubject("물리학");
                setSchool("공통 예시 교육과정");
              }}
            >
              초기화
            </button>
          </div>
          <div className="filter-group">
            <label>학년</label>
            <div className="segmented">
              {["1학년", "2학년", "3학년"].map((item) => (
                <button
                  className={grade === item ? "active" : ""}
                  onClick={() => setGrade(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <label>과목</label>
            <div className="subject-options">
              {[
                ["수학", "function"],
                ["물리학", "atom"],
                ["화학", "flask"],
                ["생명과학", "leaf"],
                ["지구과학", "atom"],
                ["정보과학", "cpu"],
              ].map(([name, icon]) => (
                <button
                  className={subject === name ? "active" : ""}
                  onClick={() => setSubject(name)}
                  key={name}
                >
                  <Icon name={icon} size={17} />
                  {name}
                  {subject === name && <Icon name="check" size={14} />}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <label>교육과정 기준</label>
            <select value={school} onChange={(event) => setSchool(event.target.value)}>
              <option>공통 예시 교육과정</option>
              <option>우리 학교 교육과정</option>
              <option>직접 설정</option>
            </select>
            <small>실제 학교 교육과정을 추후 연결할 수 있어요.</small>
          </div>
          <div className="sample-notice">
            <span>i</span>
            <p>
              현재 표시된 단원은 화면 구성을 위한 <b>예시 데이터</b>입니다. 공식 교육과정 자료가
              아니에요.
            </p>
          </div>
        </aside>

        <section className="unit-panel">
          <div className="panel-heading">
            <div>
              <span>{grade}</span>
              <b>{subject}</b>
            </div>
            <em>총 51개 수업안</em>
          </div>
          <div className="curriculum-path">
            <span>{grade}</span>
            <Icon name="chevron" size={13} />
            <span>{subject}</span>
            <Icon name="chevron" size={13} />
            <b>{openUnit}</b>
          </div>
          <div className="unit-tree">
            {curriculumUnits.map((unit) => (
              <div className={`unit-group ${openUnit === unit.name ? "open" : ""}`} key={unit.name}>
                <button
                  className="unit-button"
                  onClick={() => setOpenUnit(openUnit === unit.name ? "" : unit.name)}
                >
                  <span className="unit-chevron">
                    <Icon name="chevron" size={15} />
                  </span>
                  <span>
                    <b>{unit.name}</b>
                    <small>대단원</small>
                  </span>
                  <em>{unit.count}개</em>
                </button>
                {openUnit === unit.name && (
                  <div className="topic-list">
                    {unit.topics.map((item) => (
                      <button
                        className={topic === item.name ? "active" : ""}
                        onClick={() => setTopic(item.name)}
                        key={item.name}
                      >
                        <span />
                        <b>{item.name}</b>
                        <em>융합 수업안 {item.count}개</em>
                        <Icon name="chevron" size={14} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="result-panel">
          <div className="result-heading">
            <span>선택한 소단원</span>
            <h2>{topic}</h2>
            <p>
              <b>{subject}</b> 개념과 다른 교과를 연결한 수업안{" "}
              <strong>{topic === "소리의 성질" ? 6 : 4}개</strong>를 찾았어요.
            </p>
          </div>
          <div className="result-toolbar">
            <div className="mini-search">
              <Icon name="search" size={16} />
              <input placeholder="결과 내 검색" />
            </div>
            <select aria-label="수업안 정렬">
              <option>추천순</option>
              <option>최신순</option>
              <option>저장 많은 순</option>
            </select>
          </div>
          <div className="curriculum-results">
            {resultLessons.map((item, index) => (
              <article key={item.title}>
                <div className={`result-illustration tone-${item.tone}`}>
                  <Icon name={index === 0 ? "atom" : index === 1 ? "flask" : "cpu"} size={24} />
                </div>
                <div className="result-card-copy">
                  <div>
                    <Badge subject={{ name: item.pair, tone: item.tone }} />
                    {index === 0 && <span className="best-match">가장 적합</span>}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="result-meta">
                    <span>
                      <Icon name="clock" size={13} /> {index === 1 ? "2차시" : "3차시"}
                    </span>
                    <span>
                      <Icon name="users" size={13} /> {item.activity}
                    </span>
                    <span>
                      <Icon name="star" size={13} className="star" /> {index === 2 ? "4.7" : "4.9"}
                    </span>
                  </div>
                </div>
                <button className="view-result" onClick={() => onOpenLesson(item.lesson)}>
                  수업안 보기 <Icon name="chevron" size={14} />
                </button>
              </article>
            ))}
          </div>
          <button className="more-results">수업안 3개 더 보기</button>
        </section>
      </div>
    </div>
  );
}

function LessonDetail({
  lesson,
  saved,
  onSave,
  onClose,
  onNotify,
}: {
  lesson: Lesson;
  saved: boolean;
  onSave: () => void;
  onClose: () => void;
  onNotify: (message: string) => void;
}) {
  const [tab, setTab] = useState("수업 개요");
  return (
    <div className="detail-overlay" role="dialog" aria-modal="true" aria-label="수업안 상세">
      <div className="detail-page">
        <header className="detail-top">
          <button className="detail-brand" onClick={onClose}>
            <span className="brand-mark">
              <i />
              <i />
              <i />
            </span>
            융합교육
          </button>
          <button className="close-button" onClick={onClose}>
            <Icon name="x" size={22} /> 닫기
          </button>
        </header>
        <div className="detail-hero">
          <div className="detail-hero-content">
            <div className="badge-row">
              {lesson.subjects.map((subject) => (
                <Badge key={subject.name} subject={subject} />
              ))}
              <span className="lesson-level">{lesson.grade}</span>
            </div>
            <h1>{lesson.title}</h1>
            <p>{lesson.description}</p>
            <div className="detail-stats">
              <span>
                <Icon name="clock" size={17} />총 {lesson.time}
              </span>
              <span>
                <Icon name="users" size={17} />
                탐구·실험 중심
              </span>
              <span>
                <Icon name="star" size={17} className="star" />
                {lesson.rating} (32개 후기)
              </span>
            </div>
            <div className="detail-teacher">
              <span>{lesson.teacher.slice(0, 1)}</span>
              <div>
                <b>{lesson.teacher}</b>
                <small>영재학교 교사 · 수업안 14개</small>
              </div>
            </div>
          </div>
          <div className={`detail-art visual-${lesson.accent}`}>{lesson.visual}</div>
        </div>
        <nav className="detail-tabs">
          {["수업 개요", "차시별 구성", "활동 자료", "평가 방법", "교사 후기"].map((item) => (
            <button
              className={tab === item ? "active" : ""}
              onClick={() => setTab(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="detail-content">
          <div className="detail-main">
            {tab === "수업 개요" && (
              <>
                <section>
                  <h2>수업에서 무엇을 배우나요?</h2>
                  <p>
                    학생들은 현의 진동에서 발생하는 소리를 직접 측정하고, 파형과 주파수의 수학적
                    관계를 분석합니다. 서로 다른 음이 어울리는 이유를 <b>파동의 중첩과 배음 구조</b>
                    로 설명하며 과학적 개념과 음악적 감각의 연결을 경험합니다.
                  </p>
                  <div className="objective-list">
                    <div>
                      <span>01</span>
                      <p>
                        <b>파동의 성질 이해</b>진폭, 진동수, 파장의 관계를 실제 소리 데이터로
                        설명한다.
                      </p>
                    </div>
                    <div>
                      <span>02</span>
                      <p>
                        <b>교과 간 개념 연결</b>주파수의 정수비와 음악적 협화음의 관계를 추론한다.
                      </p>
                    </div>
                    <div>
                      <span>03</span>
                      <p>
                        <b>창의적 산출물 제작</b>탐구 결과를 활용해 조화로운 화음 악기를 설계한다.
                      </p>
                    </div>
                  </div>
                </section>
                <section>
                  <h2>교육과정 연결</h2>
                  <div className="connection">
                    <div>
                      <Badge subject={{ name: "물리학", tone: "indigo" }} />
                      <b>파동과 정보 통신</b>
                      <small>파동의 표현 · 중첩과 간섭 · 소리의 특성</small>
                    </div>
                    <Icon name="plus" size={18} />
                    <div>
                      <Badge subject={{ name: "음악", tone: "coral" }} />
                      <b>음악 요소와 원리</b>
                      <small>음정과 화음 · 음색 · 창작과 표현</small>
                    </div>
                  </div>
                </section>
                <section>
                  <h2>융합 개념 이해</h2>
                  <p>
                    수업 전 선생님이 핵심 연결을 빠르게 살펴볼 수 있도록 과학과 음악 개념을 함께
                    정리했습니다.
                  </p>
                  <div className="concept-grid">
                    {[
                      [
                        "주파수와 파장",
                        "진동수가 높을수록 음높이가 높아지며, 같은 매질에서는 파장이 짧아집니다.",
                      ],
                      [
                        "소리의 파동",
                        "공기 입자의 압축과 팽창이 종파 형태로 전달되어 우리가 소리를 듣게 됩니다.",
                      ],
                      [
                        "공명",
                        "물체의 고유 진동수와 외부 진동수가 가까울 때 진폭이 크게 증가합니다.",
                      ],
                      [
                        "배음",
                        "기본음의 정수배 주파수들이 악기마다 다른 비율로 결합해 고유한 음색을 만듭니다.",
                      ],
                      [
                        "음정과 협화",
                        "두 음의 주파수 비가 단순한 정수비에 가까울수록 안정적인 화음으로 인식되기 쉽습니다.",
                      ],
                    ].map(([title, copy], index) => (
                      <article key={title}>
                        <span>{index + 1}</span>
                        <b>{title}</b>
                        <p>{copy}</p>
                      </article>
                    ))}
                  </div>
                  <div className="media-placeholder">
                    <Icon name="atom" size={24} />
                    <div>
                      <b>소리 파형 비교 시각 자료</b>
                      <small>예시 미디어 영역 · 실제 자료 연결 전 미리보기</small>
                    </div>
                  </div>
                </section>
              </>
            )}
            {tab === "차시별 구성" && (
              <section>
                <h2>50분 수업 흐름</h2>
                <div className="timeline">
                  <div>
                    <span>도입</span>
                    <article>
                      <small>5분 · 듣기와 질문 만들기</small>
                      <b>왜 어떤 음의 조합은 다르게 들릴까?</b>
                      <p>
                        대비되는 두 화음을 듣고 느낌의 차이를 기록한 뒤, 그 이유에 관한 탐구 질문을
                        만듭니다.
                      </p>
                    </article>
                  </div>
                  <div>
                    <span>개념</span>
                    <article>
                      <small>10분 · 핵심 개념 탐구</small>
                      <b>주파수와 배음을 음악적 음정에 연결하기</b>
                      <p>
                        소리의 파동, 주파수, 배음과 공명 개념을 확인하고 음정의 주파수 비와
                        연결합니다.
                      </p>
                    </article>
                  </div>
                  <div>
                    <span>탐구</span>
                    <article>
                      <small>25분 · 학생 주도 실험</small>
                      <b>주파수 비를 바꾸며 화음 패턴 비교하기</b>
                      <p>
                        모둠별로 음파 생성 도구를 사용해 여러 음을 조합하고 관찰 결과로 가설을
                        검토합니다.
                      </p>
                    </article>
                  </div>
                  <div>
                    <span>정리</span>
                    <article>
                      <small>10분 · 발표와 성찰</small>
                      <b>물리학은 음악을 어디까지 설명할 수 있을까?</b>
                      <p>
                        모둠별 발견을 공유하고, 음악적 지각을 물리적 설명만으로 해석할 때의 한계를
                        성찰합니다.
                      </p>
                    </article>
                  </div>
                </div>
              </section>
            )}
            {tab === "활동 자료" && (
              <section>
                <h2>수업에 바로 쓰는 활동 자료</h2>
                <div className="resource-list">
                  {[
                    "학생용 탐구 활동지.pdf",
                    "주파수 분석 실험 가이드.pdf",
                    "화음 악기 설계 템플릿.pptx",
                    "수업용 음원 샘플.zip",
                  ].map((file, i) => (
                    <button key={file} onClick={() => onNotify("자료 미리보기를 준비하고 있어요.")}>
                      <span>
                        <Icon name={i === 3 ? "copy" : "comment"} size={19} />
                      </span>
                      <div>
                        <b>{file}</b>
                        <small>{i === 3 ? "12.4 MB" : `${(i + 1) * 2}.1 MB`} · 수업 자료</small>
                      </div>
                      <em>미리보기</em>
                    </button>
                  ))}
                </div>
              </section>
            )}
            {tab === "평가 방법" && (
              <section>
                <h2>과정 중심 평가</h2>
                <p>
                  개념 이해뿐 아니라 탐구 과정에서의 협력, 근거 기반 추론, 창의적 적용을 함께
                  관찰합니다.
                </p>
                <div className="rubric">
                  <b>평가 요소</b>
                  <b>관찰 기준</b>
                  <span>과학적 이해</span>
                  <span>파동과 주파수의 관계를 정확하게 설명하는가?</span>
                  <span>자료 분석</span>
                  <span>측정 데이터를 근거로 화음의 특성을 추론하는가?</span>
                  <span>협력과 소통</span>
                  <span>모둠의 역할을 수행하고 발견을 명료하게 공유하는가?</span>
                </div>
              </section>
            )}
            {tab === "교사 후기" && (
              <section>
                <h2>이 수업을 활용한 선생님 후기</h2>
                <div className="review">
                  <span>민</span>
                  <div>
                    <b>
                      이민수 선생님 <em>★★★★★</em>
                    </b>
                    <small>물리 교사 · 2주 전</small>
                    <p>
                      학생들이 소리를 직접 측정하니 파동 개념을 훨씬 빠르게 이해했습니다. 음악
                      선생님과 협력 수업으로 확장하기에도 구성이 좋았어요.
                    </p>
                  </div>
                </div>
                <div className="review">
                  <span>유</span>
                  <div>
                    <b>
                      한유진 선생님 <em>★★★★★</em>
                    </b>
                    <small>음악 교사 · 1개월 전</small>
                    <p>
                      추상적인 음정 관계를 데이터로 확인하는 과정에서 학생들의 질문이 풍부하게
                      나왔습니다.
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>
          <aside className="detail-aside">
            <button
              className="primary-wide"
              onClick={() => onNotify("이 수업안을 내 수업안으로 복사했어요.")}
            >
              <Icon name="copy" size={18} />이 수업안으로 시작하기
            </button>
            <button className={`secondary-wide ${saved ? "saved" : ""}`} onClick={onSave}>
              <Icon name="bookmark" size={18} />
              {saved ? "보관함에 저장됨" : "내 보관함에 저장"}
            </button>
            <div className="aside-action-row">
              <button
                onClick={() => {
                  setTab("활동 자료");
                  onNotify("수업 자료 영역으로 이동했어요.");
                }}
              >
                <Icon name="comment" size={15} />
                수업 자료 보기
              </button>
              <button onClick={() => onNotify("공유 링크를 복사했어요.")}>
                <Icon name="arrow" size={15} />
                공유
              </button>
            </div>
            <div className="aside-info">
              <b>수업 준비 정보</b>
              <span>
                난이도 <em>중급</em>
              </span>
              <span>
                권장 인원 <em>16–20명</em>
              </span>
              <span>
                준비 시간 <em>약 30분</em>
              </span>
              <span>
                활동 자료 <em>4개</em>
              </span>
            </div>
            <p>이 수업안은 자유롭게 재구성할 수 있어요. 원작자 정보는 자동으로 표시됩니다.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
