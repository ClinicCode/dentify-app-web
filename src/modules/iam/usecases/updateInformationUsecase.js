export class UpdateInformationUsecase {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }

    async execute(data) {
        await this.profileRepository.updateInformation(data);
    }
}
