const { AIRTABLE_API_KEY } = process.env;

exports.queryAirtable = (event, context, callback) => {
  return (id?: string) => {
    const baseUrl = "https://api.airtable.com/v0/appu1gS4L2wLClmLo/Table%201";
    const url = id ? `${baseUrl}/${id}` : baseUrl;
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`
      }
    })
      .then(res => {
        callback(null, res.json());
      })
      .catch(error => {
        console.error(error);
        callback(error);
      });
  };
};
