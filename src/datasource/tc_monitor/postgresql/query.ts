import coreModule from 'grafana/app/core/core_module';
import { PostgresFieldsDescriptor } from './query_def';

export class PostgresQueryCtrl {
  /** @ngInject */
  constructor($scope, $rootScope) {
    $scope.init = () => {
      $scope.PostgresFieldsDescriptor = PostgresFieldsDescriptor;
    };

    $scope.init();
  }
}

const template = `
<div class="tc-sub-params" ng-if="showDetail">
<label class="gf-form-label tc-info-label">
  Instances are queried by following params.
  <a target="_blank" href="https://cloud.tencent.com/document/api/409/16773">Click here to get API doc.</a>
</label>
<div class="gf-form-inline">
  <div class="gf-form">
    <label class="gf-form-label width-14">
      Offset
      <info-popover mode="right-normal">
        偏移量, 例如Offset=20&Limit=20 返回第 20 到 40 项
      </info-popover>
    </label>
    <input type="number" ng-model="target.queries.Offset" class="gf-form-input width-10" ng-min="0" ng-change="onChange()">
  </div>
</div>
<div class="gf-form-inline">
  <div class="gf-form">
    <label class="gf-form-label width-14">
      Limit
      <info-popover mode="right-normal">
        单次请求返回的数量，默认为20，最大值为100
      </info-popover>
    </label>
    <input type="number" ng-model="target.queries.Limit" class="gf-form-input width-10" ng-min="1" ng-max="100" ng-change="onChange()">
  </div>
</div>
<div class="gf-form-inline" ng-repeat="field in PostgresFieldsDescriptor">
  <label class="gf-form-label width-14">
    {{ field.key }}
    <info-popover mode="right-normal">
      {{ field.cnDescriptor }}
      <a target="_blank" href="{{field.link}}" ng-if="field.link">Click here for more information.</a>
    </info-popover>
  </label>
  <multi-condition
    ng-if="field.type === 'dropdownmulti'"
    type="'dropdown'"
    max-cond="5"
    value="target.queries.Filters[field.key]"
    get-options="getDropdown(field.key)"
    on-change="onChange()"
  ></multi-condition>
  <multi-condition
    ng-if="field.type === 'inputNumbermulti'"
    type="'inputNumber'"
    max-cond="5"
    value="target.queries.Filters[field.key]"
    maxNum="field.max"
    minNum="field.min"
    on-change="onChange()"
  ></multi-condition>
  <multi-condition
    ng-if="field.type === 'inputmulti'"
    type="'input'"
    max-cond="5"
    value="target.queries.Filters[field.key]"
    on-change="onChange()"
  ></multi-condition>
  <custom-select-dropdown
    ng-if="field.type === 'select'"
    value="target.queries.Filters[field.key]"
    options="field.list"
    multiple="true"
    on-change="onChange()"
  ></custom-select-dropdown>
</div>

</div>
`;

export function postgresQuery() {
  return {
    template: template,
    controller: PostgresQueryCtrl,
    restrict: 'E',
    scope: {
      target: '=',
      showDetail: '=',
      region: '=',
      datasource: '=',
      onChange: '&',
    },
  };
}

coreModule.directive('postgresQuery', postgresQuery);
