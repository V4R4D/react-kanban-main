import "./App.css";
import Column from "./components/Column/Column";

import 'bootstrap/dist/css/bootstrap.css'; 
import Dropdown from 'react-bootstrap/Dropdown'; 

import React, { useEffect, useState } from 'react';

import { GroupingData, OrderingData } from './components/Logic/LogicFunctions'; 




const mockData = [
  {
    title: "Urgent",
    tasks: ["Task 1", "Task 2", "Task 3", "Task 4"],
    color: "Red",
    input: "",
  },
  {
    title: "Backlog",
    tasks: ["Task 1", "Task 2", "Task 3", "Task 4"],
    color: "orange",
    input: "",
  },
  {
    title: "In progress",
    tasks: ["Task 5", "Task 6"],
    color: "purple",
    input: "",
  },
  {
    title: "Done",
    tasks: ["Task 7", "Task 8", "Task 9"],
    color: "green",
    input: "",
  },
];


function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [OriginalData, setOriginalData] = useState(null);

  const [GroupingBy , setGroupingBy] = useState("status");
  const [OrderingBy , setOrderingBy] = useState("priority");

  const [FetchData,setFetchData] = useState(true);

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  const updateAppState = (data1,OriginalData1) => {   
    if(!data1 || !OriginalData1 || data1.length == 0 || OriginalData1.length == 0){
      // localStorage.clear();
      return;
    } 
    localStorage.setItem('appData', JSON.stringify(data1));
    localStorage.setItem('OriginalData', JSON.stringify(OriginalData1));


  };
  useEffect(() => {
  var storedState = localStorage.getItem('appData');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setData(parsedState);
    }
    storedState = localStorage.getItem('OriginalData');
    if(storedState){
      const parsedState = JSON.parse(storedState);
      setOriginalData(parsedState);
    }
    setFetchData(false);
      

  }, []);

  const handleGroupingSelection = (selectedGrouping) => {
    setGroupingBy(selectedGrouping);
    setData(GroupingData(OriginalData,selectedGrouping));
  };

  const handleOrderingSelection = (selectedOrdering) => {
    setOrderingBy(selectedOrdering);
    setData(OrderingData(data,selectedOrdering));
  };

  useEffect(() => {
    if(FetchData){
      async function fetchData() {
        try {
          const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const jsonData = await response.json();
          const tickets = jsonData.tickets;
          const users = jsonData.users;
    
          const processedData = tickets.map(ticket => {
            const correspondingUser = users.find(user => user.id === ticket.userId);
            const available = correspondingUser ? correspondingUser.available : false;
    
            return { 
              "id" : ticket.id,
              "title" : ticket.title,
              "tag" : ticket.tag,
              "avail" : available,
              "userID" : ticket.userId,
              "status" : ticket.status,
              "priority" : ticket.priority,
              "name" : correspondingUser.name
            };
          });
    
         
          var storedState = localStorage.getItem('appData');
          if(!storedState){
            const groupedData = GroupingData(processedData, 'status');
            setData(groupedData);
            setOriginalData(processedData);
            updateAppState();
          }
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    
      fetchData();
    }
  }, []);
  

  const getColumnSection = () => (
    <section className="columns">
  
      <Column data={data} setData = {setData} OriginalData = {OriginalData} setOriginalData={setOriginalData} updateAppState = {updateAppState}/> 
       {/* can also send it with  props */}

       {updateAppState()};
  
    </section>
  );



  return (
    <div className="app">
      <header className="header">
        <h2>Kanban Board by Varad</h2>
      </header>
      <button onClick={clearLocalStorage}>Clear Local Storage</button>
      <div style={{ display: "block", width: 700, padding: 30 }}>
        <Dropdown>
      <Dropdown.Toggle>Display</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown>
          <Dropdown.Toggle>Grouping</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleGroupingSelection("status")}>
              Status
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleGroupingSelection("name")}>
              User
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleGroupingSelection("priority")}>
              Priority
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle>Ordering</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleOrderingSelection("priority")}>
              Priority
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleOrderingSelection("title")}>
              Title
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Dropdown.Menu>
    </Dropdown>
      </div>

      {getColumnSection()}

    </div>
  );
}

export default App;
