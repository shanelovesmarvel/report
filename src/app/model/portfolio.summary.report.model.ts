export class PortfolioSummary {
    constructor(
        public name: string,
        public currency: string,
        public date: string,
        public unsupervisedAsset?: boolean,
        public chart?: boolean
    ) {}
}