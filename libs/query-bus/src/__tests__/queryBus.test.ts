import { IQuery } from '../common/query.interface';
import { QueryBus } from '../common/queryBus';
import { IQueryHandler } from '../common/queryHandler.interface';

describe('QueryBus', () => {
  const email = 'test@gmail.com';

  describe('Given query bus', () => {
    const queryBus = new QueryBus();

    describe('When query was registered', () => {
      class FindUserQuery implements IQuery {
        public readonly email: string;

        public constructor({ email }: FindUserQuery) {
          this.email = email;
        }
      }

      class FindUserQueryHandler implements IQueryHandler<FindUserQuery, { email: string }> {
        public handle(query: IQuery): { email: string } {
          const { email } = query as FindUserQuery;

          return { email };
        }
      }

      beforeAll(() => {
        queryBus.register(FindUserQuery, new FindUserQueryHandler());
      });

      it('Then should return email in result', () => {
        const result = queryBus.execute(new FindUserQuery({ email }));

        expect(result).toEqual({ email });
      });
    });

    describe('When query was not registered', () => {
      class NotRegisterQuery implements IQuery {
        public readonly email: string;

        public constructor({ email }: NotRegisterQuery) {
          this.email = email;
        }
      }

      it('Then should throw error', () => {
        expect(() => queryBus.execute(new NotRegisterQuery({ email }))).toThrowError();
      });
    });
  });
});
