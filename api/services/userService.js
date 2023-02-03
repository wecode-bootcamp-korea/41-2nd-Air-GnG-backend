const jwt = require('jsonwebtoken');
const axios = require('axios');
const userDao = require('../models/userDao');
const { detectError } = require('../util/detectError');

const kakaoLogin = async (kakaoToken) => {
  const kakaoUserInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      authorization: `Bearer ${kakaoToken}`,
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  if (!kakaoUserInfo) detectError('KAKAO_DATA_ERROR', 400);

  const {
    id: kakaoId,
    properties: { profile_image: profileImage, nickname },
    kakao_account: { email },
  } = kakaoUserInfo.data;

  const { kakaoUserCheck } = await userDao.checkUserByKaKaoId(kakaoId);

  if (kakaoUserCheck === '0') {
    const newUser = await userDao.createUser(kakaoId, email, profileImage, nickname);

    const accessToken = jwt.sign({ userId: newUser.insertId }, process.env.JWT_SECRET_KEY);

    return accessToken;
  }

  const user = await userDao.getUserByKakaoId(kakaoId);

  const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);

  return accessToken;
};

module.exports = {
  kakaoLogin,
};
