export default interface IAdminAuthRepository{
    findAdminByEmail(email: string): Promise<any>
}