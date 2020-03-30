import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/state";
import { DemoThunkDispatch } from "../../store";
import { DemoCategory } from "./DemoCategory";
import { UserProgress } from "../../models/progress";
import { getContext } from "../../store/actions/demo";
import { Spinner } from "../ui/Spinner";
import { CategoryWithDemoVersions } from "../../models/dtos/context";

interface StateProps {
    progress: UserProgress;
    loading: boolean;
    categories: CategoryWithDemoVersions[];
}

interface DispatchProps {
    getContext: () => void;
}

type Props = StateProps & DispatchProps;

class HomeComponent extends React.Component<Props, {}> {

    public componentDidMount() {
        this.props.getContext();
    }

    private _getCategoryElement(category: CategoryWithDemoVersions, index: number) {
        const { progress } = this.props;
        const completedForCategory = progress
            && progress.completedDemos
            && progress.completedDemos.filter(x => x.category === category.slug);

        return <DemoCategory key={`demo_category_${index}`}
            category={category}
            completedDemos={completedForCategory}
        />;
    }

    private _demoList() {
        const { categories } = this.props;

        return <div className="demo-list">
            {categories && categories.map((x, i) => this._getCategoryElement(x, i))}
        </div>;
    }

    public render() {
        const { loading } = this.props;

        return <>
            <div className="header-image"><h1>RavenDB NoSQL Database Demo</h1></div>
            <Spinner show={loading} />
            {!loading && this._demoList()}
        </>;
    }
}

export const Home = connect<StateProps, DispatchProps, {}>(
    ({ demos }: AppState): StateProps => {
        const { userProgress, loadingContext: loadingMainPage, categoriesWithVersions } = demos;

        return {
            progress: userProgress,
            loading: loadingMainPage,
            categories: categoriesWithVersions
        };
    },
    (dispatch: DemoThunkDispatch): DispatchProps => ({
        getContext: () => dispatch(getContext())
    })
)(HomeComponent);
