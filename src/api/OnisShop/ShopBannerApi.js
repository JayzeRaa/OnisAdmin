import { API_URL_NEW, key } from "../../../package.json";

class ShopBannerApi {

  static AddBanner(body, data) {
    const request = new Request(API_URL_NEW + `/api/banner/${key}?BANNERNM=${data.bannernm}&STARTYMD=${data.startymd}&ENDYMD=${data.endymd}&INSBY=${data.insby}&ISENABLE=${data.isenable}`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Access-Control-Allow-Headers": "*",
      },
      body: body,
    });

    return fetch(request)
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          return response.text().then(text => {
            return Promise.reject(text);
          });
        }
        return response.json();
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  static EditBanner(data) {
    const request = new Request(API_URL_NEW + `/api/banner/edit/${key}?ID=${data.id}&BANNERNM=${data.bannernm}&STARTYMD=${data.startymd}&ENDYMD=${data.endymd}&INSBY=${data.insby}&ISENABLE=${data.isenable}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Access-Control-Allow-Headers": "*",
      },
    });

    return fetch(request)
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          return response.text().then(text => {
            return Promise.reject(text);
          });
        }
        return response.json();
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  static GetAllBanner(body) {
    const request = new Request(API_URL_NEW + `/api/banner/list`, {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    	body: JSON.stringify(body),
    });

    return fetch(request)
			.then(response => {
				if (response.status >= 400 && response.status < 600) {
					return response.text().then(text => {
						return Promise.reject(text);
					});
				}
				return response.json();
			})
			.catch(error => {
				return Promise.reject(error);
			});
  }

  static DisableBanner (id, updby){
    const request = new Request(API_URL_NEW + `/api/banner/${id}/${updby}`, 
    {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json, text/plain, */*",
        "Access-Control-Allow-Headers": "*",
      }),
    });
    return fetch(request)
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          return response.text().then(text => {
            return Promise.reject(text);
          });
        }
        return response.json();
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
  
}

export default ShopBannerApi;
