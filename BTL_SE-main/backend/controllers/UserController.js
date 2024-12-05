import UserRepository from "../repositories/UserRepository.js";

/**
 * Controller handling User-related operations
 */
class UserController {
    constructor(){
        this.userRepository  = new UserRepository();
    }

    /**
     * Get user by id
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */

    getUsersByID = async (req, res) => { 

      try{
          const userId = parseInt(req.params.user_id);  
          const user = await this.userRepository.findById(userId);
          if(!user){
              return res.status(404).json({
                  success:false,
                  message: "User not found"
              })
          }
          res.status(200).json({
            userId: user.userId,
            userName: user.userName,
            email: user.email,
            password: user.password,
            role: user.role,
            create_at: user.createAt
          })
      }catch(error){
          res.status(500).json({
              success:false,
              message: `Failed to fetch User: ${error.message}`
          })
      }
  };
      /**
     * Create user
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
  createUser = async (req, res) => {
    try{
        const{
          user_name,
          email,
          password
        } = req.body;

        const newUser = await this.userRepository.create({
            userName: user_name,
            email: email,
            password: password,
            role: 'Student'
        });

        res.status(200).json({
            success:true,
            message: "User created successfully",
            user: newUser
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: `Failed to create user: ${error.message}`
        })
    }
  };
};
export default new UserController();
