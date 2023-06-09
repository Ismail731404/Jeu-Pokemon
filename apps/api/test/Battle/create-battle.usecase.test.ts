import {afterEach, describe, expect, test, vi} from 'vitest'
import {CreateBattleUsecase} from "../../src/domain/Battle/create-battle.usecase";
import {Battle, PokemonTeam} from '../../src/domain/entities';
import {generateAttackerAndOpponentForTest} from "./battle.repository.test"
describe('Create Battle Usecase - test', () => {
    const battleRepositoryMock = {
        create: vi.fn(),
        findAll: vi.fn(),
        find:  vi.fn(),
        findActiveBattleWithTrainerId : vi.fn(),
        update : vi.fn(),
    }

    let createBattleUsecase = new CreateBattleUsecase(battleRepositoryMock);

    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should create ', async () => {
        const {attackingTrainerId, opposingTrainerId, attackerPokemonId, opponentPokemonId, winner} = await generateAttackerAndOpponentForTest();

        // GIVEN
        const expectedBattle: Battle = {
            id: 1,
            attackingTrainerId:       attackingTrainerId,
            opposingTrainerId:        opposingTrainerId,
            attackerPokemonId:        attackerPokemonId,
            opponentPokemonId:        opponentPokemonId,
            winner:                   winner
        }

        battleRepositoryMock.create.mockImplementation(() => expectedBattle)

        // WHEN
        const battle = await createBattleUsecase.execute({ attackingTrainerId: expectedBattle.attackingTrainerId,
                                                                 opposingTrainerId: expectedBattle.opposingTrainerId,
                                                                 attackerPokemonId: expectedBattle.attackerPokemonId,
                                                                 opponentPokemonId: expectedBattle.opponentPokemonId,
                                                                 winner: expectedBattle.winner });

        // THEN
        expect(battleRepositoryMock.create).toHaveBeenCalledOnce()
        expect(battleRepositoryMock.create).toBeCalledWith({
            attackingTrainerId: expectedBattle.attackingTrainerId,
            opposingTrainerId: expectedBattle.opposingTrainerId,
            attackerPokemonId: expectedBattle.attackerPokemonId,
            opponentPokemonId: expectedBattle.opponentPokemonId,
            winner: expectedBattle.winner
        })
        expect(expectedBattle).toStrictEqual(battle);
    })
})