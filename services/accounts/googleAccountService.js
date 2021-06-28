const ANALYTICACCOUNT = require("../../schemas/analyticAccount.schema");
const ACCOUNT = require("../../schemas/account.schema");
const axios = require("axios");

async function initialFetchAccounts(
  accountId,
  userId,
  iscalledWithRefeshToken = false
) {
  try {
    const analyticsAccountsresponse = await fetchAccounts(accountId);
    if (
      analyticsAccountsresponse.data &&
      analyticsAccountsresponse.data.items &&
      analyticsAccountsresponse.data.items.length
    ) {
      accounts = analyticsAccountsresponse.data.items.map(a => {
        a.userId = userId;
        a.accountId = accountId;
        return a;
      });
      await ANALYTICACCOUNT.insertMany(accounts, {
        ordered: false
      });
      return true;
    }
    return true;
  } catch (error) {
    if (
      error.response &&
      error.response.status == 401 &&
      !iscalledWithRefeshToken
    ) {
      //refresh the token
      const status = await oauthService.GetNewTokenFromRefreshToken(
        req.params.accountId
      );
      console.log(status);
      if (status) return initialFetchAccounts(accountId, userId, true);
    }

    return false;
  }
}
async function fetchAccounts(accountId) {
  try {
    const accounts = await ACCOUNT.findById(accountId);
    return axios({
      method: "get",
      headers: { Authorization: `Bearer ${accounts.access_token}` },
      params: {
        "max-results": 1000,
        "start-index": 1
      },
      url: "https://www.googleapis.com/analytics/v3/management/accountSummaries"
    });
  } catch (error) {
    return error;
  }
}
async function GetAccounts(uid) {
  try {
    return await ANALYTICACCOUNT.findOne({ userId: req.uid });
  } catch (error) {
    return error;
  }
}
module.exports = {
  fetchAccounts,
  initialFetchAccounts,
  GetAccounts
};
