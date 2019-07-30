import { AirTableRecord, PointOfInterest } from "./../components/Map";

export const queryAirtable = (id?: string) => {
  const baseUrl = "https://api.airtable.com/v0/appu1gS4L2wLClmLo/Table%201";
  const url = id ? `${baseUrl}/${id}` : baseUrl;
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_KEY}`
    }
  })
    .then(res => res.json())
    .catch(console.error);
};

export const fetchAllLocations = (): Promise<PointOfInterest[]> => {
  return queryAirtable().then(res => {
    return res.records
      .filter(r => r.fields.title !== undefined)
      .map((r: AirTableRecord) => ({
        ...r.fields,
        createdTime: r.createdTime,
        id: r.id
      }));
  });
};

export const fetchLocationById = (id: string): Promise<PointOfInterest> => {
  return queryAirtable(id).then(res => {
    return { ...res.fields, createdTime: res.createdTime, id: res.id };
  });
};
