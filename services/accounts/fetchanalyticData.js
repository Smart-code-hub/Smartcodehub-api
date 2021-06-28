const ANALYTICACCOUNT = require("../../schemas/analyticAccount.schema");
const ACCOUNT = require("../../schemas/account.schema");
const axios = require("axios");
const moment =  require('moment');

const oauthService = require('../googleOauth')
  async function fetchAnalyticdata(viewId,accountId) {
    console.log('inside it');
    
    try {
  
      const accounts = await ACCOUNT.findById(accountId);


      const matrices =['ga:users','ga:percentNewSessions','ga:bounces','ga:organicSearches'
      ,'ga:impressions','ga:adClicks','ga:pageviews','ga:avgTimeOnPage'];
      const response = await  axios({
        method: "get",
        headers: { Authorization: `Bearer ${accounts.access_token}` },
        params: {
          "ids": `ga:${viewId}`,
          "start-date": 'yesterday',
          "end-date":"today",
          
          "metrics":matrices.join(),
          'access_token':accounts.access_token
        },
        url: "https://www.googleapis.com/analytics/v3/data/ga"
      });
console.log(response);

      return response;
    } catch (error) {
      console.log(error);
      
      if (
        error.response &&
        error.response.status == 401
        
      ) {
        //refresh the token
        const status = await oauthService.GetNewTokenFromRefreshToken(
          accountId
        );
        console.log(status);
        if (status) return fetchAnalyticdata(viewId,accountId);
      }
        
      return error;
    }
  }

module.exports = {fetchAnalyticdata}