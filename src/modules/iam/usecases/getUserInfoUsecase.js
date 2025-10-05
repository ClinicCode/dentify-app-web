export class GetUserInfoUsecase {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }

    async execute() {
        return await this.profileRepository.getUserInfo();
    }
}
