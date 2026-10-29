import {useState} from 'react'
import ClienteApi from './components/ClienteApi'
import ClientePython from './components/ClientePython'

//Define os 
type TabType = "python" | "api"

const App = () => {
  const [activeTab, setActiveTab] = useState<TabType>('python')

  return (
    <>
      <div>
        <h1>Painel Simple de APIs</h1>
        <div>
          <button onClick={() => setActiveTab("python")}>
            {activeTab === "python"}
            Cliente Python
            </button>
          <button onClick={() => setActiveTab("api")}>
            {activeTab === "api"}
            Cliente API
          </button>
        </div>

        {activeTab === "python" && <ClientePython />}
        {activeTab === "api" && <ClienteApi />}
        
      </div>
    </>
  )
}

export default App
