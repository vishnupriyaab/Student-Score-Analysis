export default interface IAdminAuthServices{
    adminLogin(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }>
}