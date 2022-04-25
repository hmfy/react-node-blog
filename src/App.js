import './App.css';
import React from "react"
import AppLayout from 'views/Layout'

function App() {
	return (
		<div className="app" style={{
			height: "100vh",
			overflowX: "hidden",
			overflowY: "scroll",
		}}>
			<AppLayout />
		</div>
	);
}

export default App;
