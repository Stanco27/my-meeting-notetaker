import "./App.css";
import NavigationBar from "./navigation-bar/NavigationBar";
import AppRoutes from "./routes/appRoutes";
import TranscriptHandler from "./transcript-handler/TranscriptHandler";


function App() {
  return (
    <>
      <NavigationBar />
      <AppRoutes />
      {/* <TranscriptHandler /> */}
    </>
  );
}

export default App;
