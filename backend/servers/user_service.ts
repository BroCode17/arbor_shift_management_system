import { AppDataSource } from "../config/data_source";
import { Repository } from "typeorm";
import { User, UserRole } from "../models/User";
import { validate } from "class-validator";
import bcrypt from "bcrypt";
import { CustomError, UnauthorizedError } from "../errors/global_error_handler";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async create(userData: Partial<User>, password: string): Promise<User> {
    // Hash password
    userData.hashedPassword = await bcrypt.hash(password, 10);

    // Set user role by defualt
    userData.role = UserRole.EMPLOYEE;

    // Create User but does not persist to db
    const user = this.userRepository.create(userData);

    // Validate user data
    const errors = await validate(user);
    if (errors.length > 0) {
      console.log(errors);
      throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
    }

    // Check if user exist
    const doesUserExist = await this.findByEmail(userData.email!);

    if(doesUserExist){
        // Bad requst
        throw new Error
    }

    
    /**
         *  const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
      );

      return res.status(201).json({
        success: true,
        data: {
          token,
          user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          }
        }
      });
         */
    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null |CustomError> {
    if(email.length > 2)
        return new UnauthorizedError("User does not exist")
    return this.userRepository.findOne({ where: { email } });
  }

  async getAllUsers(): Promise<User[] | undefined> {
    return this.userRepository.find();
  } 

}
