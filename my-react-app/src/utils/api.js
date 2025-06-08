// Simulate Axios API calls for dashboard data

export const fetchDashboardCards = () => {
  // Simulate API call with dummy data and a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { label: 'Team Members', value: 8 },
        { label: 'Active Projects', value: 3 },
        { label: 'Notifications', value: 5 },
      ]);
    }, 700);
  });
};

export const fetchDashboardChart = () => {
  // Simulate API call with dummy data and a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Mon', progress: 2 },
        { name: 'Tue', progress: 4 },
        { name: 'Wed', progress: 3 },
        { name: 'Thu', progress: 5 },
        { name: 'Fri', progress: 6 },
        { name: 'Sat', progress: 4 },
        { name: 'Sun', progress: 7 },
      ]);
    }, 700);
  });
};
