export class UpdatePasswordUsecase {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }

    async execute(data) {
        await this.profileRepository.updatePassword(data);
    }
}
