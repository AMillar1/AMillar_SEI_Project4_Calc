import { useEffect, useState} from 'react';
import * as logAPI from "../../utilities/log-api"


export default function CompListPage() {

  const [logs, setLogs] = useState([]);

  useEffect(function() {
    async function getLogs() {
      const logs = await logAPI.getAll();
      setLogs(logs);
    }
    getLogs();
  }, []);

  return (
    <>
      <h1>Log History</h1>
      {logs.map(log => 
      <div className="form-container">
        {log.items.map(item => 
        <div>{item}
        </div>)} 
        <button>Delete</button>
      </div>)}
    </>
  );
}