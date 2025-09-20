export class RegisterUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    async execute(registerData) {
        return await this.authRepository.register(registerData);
    }
}
