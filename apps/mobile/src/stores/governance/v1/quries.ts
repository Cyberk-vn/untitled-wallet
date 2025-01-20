import {
  ChainGetter,
  ObservableQueryStakingPool,
  QueriesSetBase,
  QuerySharedContext,
} from '@titan-wallet/stores';
import {DeepReadonly} from 'utility-types';
import {ObservableQueryGovernanceV1} from './proposals';
import {ObservableQueryProposalVoteV1} from './vote';

export interface CosmosGovernanceQueriesV1 {
  governanceV1: CosmosGovernanceQueriesImpl;
}

export const CosmosGovernanceQueriesV1 = {
  use(): (
    queriesSetBase: QueriesSetBase,
    sharedContext: QuerySharedContext,
    chainId: string,
    chainGetter: ChainGetter,
  ) => CosmosGovernanceQueriesV1 {
    return (
      _: QueriesSetBase,
      sharedContext: QuerySharedContext,
      chainId: string,
      chainGetter: ChainGetter,
    ) => {
      return {
        governanceV1: new CosmosGovernanceQueriesImpl(
          sharedContext,
          chainId,
          chainGetter,
        ),
      };
    };
  },
};

export class CosmosGovernanceQueriesImpl {
  public readonly queryGovernance: DeepReadonly<ObservableQueryGovernanceV1>;
  public readonly queryVotes: DeepReadonly<ObservableQueryProposalVoteV1>;

  constructor(
    sharedContext: QuerySharedContext,
    chainId: string,
    chainGetter: ChainGetter,
  ) {
    this.queryGovernance = new ObservableQueryGovernanceV1(
      sharedContext,
      chainId,
      chainGetter,
      new ObservableQueryStakingPool(sharedContext, chainId, chainGetter),
    );

    this.queryVotes = new ObservableQueryProposalVoteV1(
      sharedContext,
      chainId,
      chainGetter,
    );
  }
}
