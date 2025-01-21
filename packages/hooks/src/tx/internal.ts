import {
  CosmosQueriesImpl,
  IQueriesStore,
  OsmosisQueries,
} from "@titan-wallet/stores";
import { TitanETCQueriesImpl } from "@titan-wallet/stores-etc";
import { EthereumQueries } from "@titan-wallet/stores-eth";

export type QueriesStore = IQueriesStore<
  Partial<OsmosisQueries> &
    Partial<EthereumQueries> & {
      cosmos?: Pick<
        CosmosQueriesImpl,
        "queryDelegations" | "queryFeeMarketGasPrices"
      >;
    } & {
      titanETC?: Pick<
        TitanETCQueriesImpl,
        "queryTerraClassicTaxRate" | "queryTerraClassicTaxCaps"
      >;
    }
>;
