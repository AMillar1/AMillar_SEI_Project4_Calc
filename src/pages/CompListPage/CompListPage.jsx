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
      <h1>CompListPage</h1>
      {logs.map(log => <div>{log.items}</div>)}
      
      
    </>
  );
}