import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import sortAlphaNum from '../utils/sortAlphaNum';
import { filterData } from '../redux/actions/actions';

class FilterPanel extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { markers = { 'source': [], 'target': [] } } = this.props;

        $('.sourceChromosomeSelect')
            .selectpicker({
                'actionsBox': true,
                'iconBase': 'icon',
                'tickIcon': 'icon-check',
                'selectedTextFormat': 'count > 2'
            })
            .selectpicker('val', markers.source);

        $('.targetChromosomeSelect')
            .selectpicker({
                'actionsBox': true,
                'iconBase': 'icon',
                'tickIcon': 'icon-check',
                'selectedTextFormat': 'count > 2'
            })
            .selectpicker('val', markers.target);;
    }

    componentDidUpdate() {
        const { markers = { 'source': [], 'target': [] } } = this.props;
        $('.sourceChromosomeSelect').selectpicker('refresh').selectpicker('val', markers.source);
        $('.targetChromosomeSelect').selectpicker('refresh').selectpicker('val', markers.target);
    }

    componentWillUnmount() {
        $('.sourceChromosomeSelect').selectpicker('destroy');
        $('.targetChromosomeSelect').selectpicker('destroy');
    }
    onSubmit(e) {
        e.preventDefault();
        const sourceMarkers = $('.sourceChromosomeSelect').selectpicker('val'),
            targetMarkers = $('.targetChromosomeSelect').selectpicker('val');
        //  if markers lists are null set them to empty lists
        this.props.filterData(!!sourceMarkers ? sourceMarkers : [], !!targetMarkers ? targetMarkers : [], this.props.alignmentList);
    }

    render() {

        let { chromosomeMap = {} } = this.props,
            // sort chromosome map 
            chromosomeMapList = [...chromosomeMap].sort(sortAlphaNum);
        // create list of options
        const options = chromosomeMapList.map((value, index) => {
            return <option key={index} value={value[0]}>{value[0]}</option>;
        });

        return (
            <div id='filter-panel-root' className='container-fluid'>
                <form className="filter-panel-container">
                    <div className="col-sm-12">
                        <label htmlFor="sourceChromosomes">Source Chromosomes</label>
                        <select className="sourceChromosomeSelect" multiple title="Select Chromosomes...">
                            {options}
                        </select>

                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="targetChromosomes">Target Chromosomes</label>
                        <select className="targetChromosomeSelect" multiple title="Select Chromosomes...">
                            {options}
                        </select>

                    </div>
                    <button type="submit" className="btn btn-primary-outline" onClick={this.onSubmit}>
                        GO <span className="icon icon-cw"></span>
                    </button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { filterData: bindActionCreators(filterData, dispatch) };
}

function mapStateToProps(state, ownProps) {
    return {
        chromosomeMap: state.genome.chromosomeMap,
        markers: state.oracle.configuration.markers,
        alignmentList: state.genome.alignmentList
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
