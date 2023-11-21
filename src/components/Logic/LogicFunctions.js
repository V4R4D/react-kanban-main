export const GroupingData = (data, attribute) => {
    if (!data || !Array.isArray(data) || !attribute) return null;
  
    const groupedData = {};
  
    data.forEach(ticket => {
      const value = ticket[attribute];
      if (!groupedData[value]) {
        groupedData[value] = [ticket];
      } else {
        groupedData[value].push(ticket);
      }
    });
    
    return groupedData;
  };
  
  export const OrderingData = (data, method) => {
    if (!data || !method) return null;
  
    const orderedData = { ...data };
  
    Object.keys(orderedData).forEach(key => {
      if (Array.isArray(orderedData[key])) {
        orderedData[key].sort((a, b) => {
          if (method === 'priority') {
            return a.priority - b.priority;
          } else if (method === 'title') {
            const titleA = a.title || '';
            const titleB = b.title || '';
            return titleA.localeCompare(titleB);
          }
          return 0;
        });
      }
    });
    return orderedData;
  };
  