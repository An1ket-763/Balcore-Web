import learnHtml from "./LearnTab.html?raw";

const LearnTab = () => {
  return (
    <iframe
      title="Balcore — Learn"
      srcDoc={learnHtml}
      style={{
        border: "none",
        width: "100vw",
        height: "100vh",
        display: "block",
      }}
    />
  );
};

export default LearnTab;
