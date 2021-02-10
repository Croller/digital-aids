import Base from './baseClientService'
import A from '../redux/actionTypes'

class AuthService extends Base {

    // static async login(login, password){
    //     console.debug("Sending login request")
    //     try{
    //         const result = await this.POST("/auth/admin/login", {login, password} )
    //         if( result ){
    //             const {user, token} = result
    //             // dispatch redux action
    //             this.dispatch( this.actionTypes.LOGIN, {user, token} )
    //             return result
    //         } else{
    //             console.error("Wrong result received: ", result)
    //             return false
    //         }
    //     } catch(e){
    //         console.log("Error: ", e.message)
    //         this.Error( e.message )
    //         return false
    //     }
    // }
    
    // static async logout(){
    //     try{
    //         await this.POST("/auth/admin/logout")
    //         this.dispatch(A.LOGOUT)
    //         return true
    //     }catch(e){
    //         console.error("Error logging out: ", e.message)
    //         return false
    //     }
    // }
    
    // static async renew(){
    //     console.debug( "auth.renew() renewal")
    //     try{
    //         const result = await this.POST("/auth/renew")
    //         console.debug( "renewed token data:",  result )
    //         if( result && result.token ){
    //             const {token} = result
    //             console.debug("Renewed token: ", token)
    //             this.dispatch( A.RENEW_TOKEN, token  )
    //             return true
    //         } else {
    //             console.error("Wrong data received: ", result )
    //         }
    //     }catch(e){
    //         console.error("Error renewing token: ", e.message)
    //         return false
    //     }
    // }
    
}


Base.extend( AuthService )


export default AuthService