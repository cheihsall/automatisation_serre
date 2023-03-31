export class CreateDonneeDto {
  static email: any;
  save():
    | import('../entities/donnee.entity').User
    | PromiseLike<import('../entities/donnee.entity').User> {
    throw new Error('Method not implemented.');
  }
  static prenom: any;
}
