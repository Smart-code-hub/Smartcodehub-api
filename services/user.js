const GetAuthUrl = async (req, res) => {
  try {
    url = GoogleService.GetAuthUrl();
    res.send({ url: url });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const GetRefreshToken = async (req, res) => {
  try {
    var code = req.body.code;
    url = await GoogleService.GetRefreshToken(code);
    res.send({ url: url });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = {
  GetAuthUrl,
  GetRefreshToken
};
