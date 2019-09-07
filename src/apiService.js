const URL  = 'https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api';

export const getChildrenNodes = async (nodeId = 0) => (
  fetch(`${URL}?manager=${nodeId}`)
    .then(r => r.json())
);