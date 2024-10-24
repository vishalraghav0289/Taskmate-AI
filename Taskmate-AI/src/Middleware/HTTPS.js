const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/test');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  