import api from '../query/API';

class StationService {
  constructor() {}

  async getAllStation() {
    try {
      console.log('fetching stations');
      const res = await api.send('GET', '/api/v1/profile/stations', true);
      console.log('data: ', res.data);
      console.log('length from service: ', res.data.stations.length);

      if (res.status == 200) {
        return res.data;
      } else {
        throw res;
      }
    } catch (e) {
      const code = e.status;
      alert('Error: Stations could not be fetched', e.message, code);
      return [];
    }
  }
}
let serviceStation = new StationService();
export default serviceStation;
