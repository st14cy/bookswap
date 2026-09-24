import type AuthorizationResult from '../../entity/auth/structures/AuthorizationResult';
import type {RegisterPayload} from './RegisterPayload.tsx';

export type {RegisterPayload};

export default interface RegisterRepository {
    register(payload: RegisterPayload): Promise<AuthorizationResult>;
}
