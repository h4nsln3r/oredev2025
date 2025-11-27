import React, { useState } from "react";
import { Example1SpinnerDelay } from "./pages/Example1SpinnerDelay";
import { Example3SkeletonScreens } from "./pages/Example3SkeletonScreens";
import { Example4Optimistic } from "./pages/Example4Optimistic";
import { Example5FastVsSlow } from "./pages/Example5FastVsSlow";

type Page =
  | "home"
  | "example1"
  | "example2"
  | "example3"
  | "example4"
  | "example5";

export const Router: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "example1":
        return <Example5FastVsSlow />;
      case "example2":
        return <Example5FastVsSlow />;
      case "example3":
        return <Example3SkeletonScreens />;
      case "example4":
        return <Example4Optimistic />;
      case "example5":
        return <Example1SpinnerDelay />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <button
          onClick={() => setCurrentPage("home")}
          style={{
            ...styles.navButton,
            backgroundColor: currentPage === "home" ? "#333" : "transparent",
            color: currentPage === "home" ? "white" : "#666",
          }}
        >
          ← Back Home
        </button>
        <h1 style={{ flex: 1, margin: 0, paddingLeft: "1rem" }}>
          ⚡ Creating Fast-Feeling Web Apps - Öredev 2025
        </h1>
      </nav>

      <div style={styles.content}>{renderPage()}</div>
    </div>
  );
};

const HomePage: React.FC<{ onNavigate: (page: Page) => void }> = ({
  onNavigate,
}) => (
  <div style={styles.homeContainer}>
    <div style={styles.hero}>
      <h1>Creating Fast-Feeling Web Apps</h1>
      <p>Practical patterns from Öredev 2025</p>
    </div>

    <div style={styles.intro}>
      <h2>🎯 Core Principles</h2>
      <div style={styles.principleGrid}>
        <div style={styles.principle}>
          <div style={styles.principleIcon}>⏱️</div>
          <h3>300ms Threshold</h3>
          <p>Most humans don't perceive delays under 300ms</p>
        </div>
        <div style={styles.principle}>
          <div style={styles.principleIcon}>✨</div>
          <h3>Perception Matters</h3>
          <p>User experience is about feeling, not metrics</p>
        </div>
        <div style={styles.principle}>
          <div style={styles.principleIcon}>🎭</div>
          <h3>Smart Feedback</h3>
          <p>Use spinners, skeletons, and animations wisely</p>
        </div>
        <div style={styles.principle}>
          <div style={styles.principleIcon}>⚡</div>
          <h3>Optimistic Updates</h3>
          <p>Show results before server confirms</p>
        </div>
      </div>
    </div>

    <div style={styles.examples}>
      <h2>📚 Hands-On Examples</h2>
      <div style={styles.exampleGrid}>
        <ExampleCard
          title="Example 1"
          subtitle="Fast vs Slow Spinners"
          description="Visual comparison of spinner timing impact"
          points={[
            "Side-by-side comparison",
            "Perceived performance",
            "User psychology",
          ]}
          onClick={() => onNavigate("example1")}
          color="#6f42c1"
        />
        <ExampleCard
          title="Example 2"
          subtitle="Delay Spinners by ~300ms"
          description="Avoid 'instant slowness' by delaying loading indicators"
          points={[
            "Delay spinners by ~300ms",
            "No spinner for fast loads",
            "Smooth appearance if needed",
          ]}
          onClick={() => onNavigate("example5")}
          color="#007bff"
        />

        <ExampleCard
          title="Example 3"
          subtitle="Skeleton Screens"
          description="Grey placeholders that reduce uncertainty while content loads"
          points={[
            "Reduce uncertainty",
            "Preserve layout stability",
            "Communicate 'loading' calmly",
          ]}
          onClick={() => onNavigate("example3")}
          color="#ff6b6b"
        />

        <ExampleCard
          title="Example 4"
          subtitle="Optimistic Updates"
          description="Update UI immediately, sync with server later"
          points={[
            "Instant UI feedback",
            "Background sync",
            "Automatic rollback on error",
          ]}
          onClick={() => onNavigate("example4")}
          color="#ffc107"
        />
      </div>
    </div>

    <div style={styles.actionItems}>
      <h2>🚀 Key Action Points</h2>
      <ul style={styles.actionList}>
        <li>✅ Delay spinners by ~300ms to avoid "instant slowness"</li>
        <li>✅ Use skeleton screens for short, frequent loading states</li>
        <li>✅ Design UI transitions that feel intentional and smooth</li>
        <li>✅ Use animations to mask waiting and reduce perceived delay</li>
        <li>✅ Focus on user perception — not just DevTools metrics</li>
      </ul>
    </div>

    <div style={styles.footer}>
      <p>
        💡 Pro tip: Test each example and pay attention to how the UI{" "}
        <em>feels</em>, not just how fast it is!
      </p>
    </div>
  </div>
);

const ExampleCard: React.FC<{
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  onClick: () => void;
  color: string;
}> = ({ title, subtitle, description, points, onClick, color }) => (
  <div
    onClick={onClick}
    style={{
      ...styles.exampleCard,
      borderLeftColor: color,
    }}
  >
    <div style={{ ...styles.exampleCardHeader, backgroundColor: color }}>
      <span style={{ fontSize: "1.5rem" }}>{title}</span>
    </div>
    <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>{subtitle}</h3>
    <p style={{ color: "#666", marginBottom: "1rem" }}>{description}</p>
    <ul style={styles.cardPoints}>
      {points.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>
    <button
      onClick={onClick}
      style={{
        ...styles.exploreButton,
        backgroundColor: color,
      }}
    >
      Explore Example →
    </button>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#fafafa",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: "1rem 2rem",
    borderBottom: "1px solid #ddd",
    gap: "1rem",
  },
  navButton: {
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "bold",
    transition: "all 0.2s",
  },
  content: {
    padding: "2rem",
  },
  homeContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  hero: {
    textAlign: "center",
    paddingBottom: "2rem",
    borderBottom: "2px solid #007bff",
    marginBottom: "2rem",
  },
  intro: {
    marginBottom: "3rem",
  },
  principleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginTop: "1.5rem",
  },
  principle: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    textAlign: "center",
  },
  principleIcon: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  examples: {
    marginBottom: "3rem",
  },
  exampleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
    marginTop: "1.5rem",
  },
  exampleCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    borderLeft: "4px solid",
    padding: "1.5rem",
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  exampleCardHeader: {
    color: "white",
    padding: "1rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    marginLeft: "-1.5rem",
    marginRight: "-1.5rem",
    marginTop: "-1.5rem",
    paddingLeft: "1.5rem",
  },
  cardPoints: {
    listStyle: "none",
    padding: 0,
    margin: "1rem 0",
    fontSize: "0.9rem",
  },
  exploreButton: {
    width: "100%",
    padding: "0.75rem",
    border: "none",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "1rem",
    transition: "all 0.2s",
  },
  actionItems: {
    backgroundColor: "#e8f5e9",
    padding: "2rem",
    borderRadius: "8px",
    borderLeft: "4px solid #28a745",
    marginBottom: "2rem",
  },
  actionList: {
    listStyle: "none",
    padding: 0,
    marginTop: "1rem",
  },
  footer: {
    textAlign: "center",
    padding: "2rem",
    color: "#666",
    borderTop: "1px solid #ddd",
  },
};
