const { mysqlDatabase } = require('../models/dbconfig');
const { detectError } = require('../util/detectError');

const checkUserByKaKaoId = async (kakaoId) => {
  try {
    const [result] = await mysqlDatabase.query(
      `
      SELECT EXISTS (
        SELECT
        u.kakao_id
      FROM
        users u
      WHERE u.kakao_id = ?
      ) as kakaoUserCheck
      `,
      [kakaoId]
    );
    return result;
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 500);
  }
};

const createUser = async (kakaoId, email, profileImage, nickname) => {
  try {
    return await mysqlDatabase.query(
      `
      INSERT INTO users (
        kakao_id,
        email,
        profile_image,
        nickname
    ) VALUES (?, ?, ?, ?)
      `,
      [kakaoId, email, profileImage, nickname]
    );
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 500);
  }
};

const getUserByKakaoId = async (kakaoId) => {
  try {
    const [result] = await mysqlDatabase.query(
      `
      SELECT
        u.id,
        u.kakao_id
      FROM
        users u
      WHERE u.kakao_id = ?
      `,
      [kakaoId]
    );
    return result;
  } catch (err) {
    console.error(err.stack);
    detectError('DATABASE_ERROR', 500);
  }
};

module.exports = {
  getUserByKakaoId,
  createUser,
  checkUserByKaKaoId,
};
