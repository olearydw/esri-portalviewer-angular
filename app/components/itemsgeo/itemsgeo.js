'use strict';

angular.module('esri-portal.itemsgeo', [])

.controller('ItemsGeoCtrl', ['$scope', 'PortalServicesFactory', 'esriRegistry', function ($scope, PortalServicesFactory, esriRegistry) {
    $scope.portalName = "ArcGIS Online";
    $scope.portalUrl = "https://www.arcgis.com";

    $scope.map = {
      center: {
        lng: -40,
        lat: 38
      },
      zoom: 2,
      loaded: false
    };

    $scope.mapLoaded = function (map) {
      $scope.map.loaded = true;
    };

    $scope.extentChanged = function (e) {
      $scope.map.extent = e.extent;
      $scope.map.centerPoint = $scope.convertPointToGeographic( e.extent.getCenter() );
    };

    esriRegistry.get('map').then(function (map) {
      map.on('click', function (e) {
        $scope.convertMapClickPointToGeographic(e.mapPoint);
      });

      $scope.addFeatureLayerToMap = function (layer) {
        console.log('add layer now', layer);
        map.addLayer(layer);
      };

    });

    $scope.getPortalItems = function () {
      var params = {
        num: 100,
        start: 0,
        t: 'content',
        sortField: 'numViews',
        sortOrder: 'asc',
        q:"(type:\"Web Map\") -type:\"Web Mapping Application\" ",
        f: 'json'
      };

      var promise = PortalServicesFactory.getPortalItems(params);

      promise.then(
        function (response) {
          //console.log('RESPONSE IN GEO CTRL', response);
          var extentsArr = [];
          angular.forEach(response.data.results, function (item) {
            if (item.extent.length === 2) {
              extentsArr.push(item);
            };
          });

          $scope.doCreateExtentFeatures(extentsArr);
        },
        function (errorResponse) {
          console.log('failure loading items', errorResponse);
        }
      );
    };

    $scope.getPortalItems();

    require([
      "dojo/_base/Color",
      "esri/geometry/webMercatorUtils",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/SimpleLineSymbol",
      "esri/layers/FeatureLayer",
      "esri/geometry/Extent",
      "esri/SpatialReference",
      "esri/graphic"
    ], function (Color, webMercatorUtils, SimpleMarkerSymbol, SimpleLineSymbol, FeatureLayer, Extent, SpatialReference, Graphic) {
      
      var spatialReference = new SpatialReference({ wkid: 4326 });

      var itemPointSym = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
        new Color([255, 255, 255]), 1),
        new Color([232, 104, 80, 0.75])
      );


      
      var layerDefinition = {
        "geometryType": "esriGeometryPoint",
        "fields": [
          {
            name: "ObjectID",
            type: "esriFieldTypeOID",
            alias: "ObjectID"
          }
        ]
      };

      
      var featureCollection = {
        "layerDefinition": layerDefinition,
        "featureSet": {
          "features": [],
          "geometryType": "esriGeometryPoint"
        }
      };

      
      var centerPtFeatureLayer = new FeatureLayer(featureCollection, {
        id: "itemCentersLayer"
        //infoTemplate: popupTemplate
      });
      



      $scope.doCreateExtentFeatures = function (extentsArr) {
        console.log(extentsArr);
        angular.forEach(extentsArr, function (item) {
          var xmin = Number(item.extent[0][0]);
          var ymin = Number(item.extent[0][1]);
          var xmax = Number(item.extent[1][0]);
          var ymax = Number(item.extent[1][1]);

          var extent = new Extent(xmin, ymin, xmax, ymax, spatialReference);
          var centerPt = extent.getCenter();

          var centerPtGraphic = new Graphic(centerPt);

          centerPtGraphic.setSymbol(itemPointSym);
          centerPtFeatureLayer.add(centerPtGraphic);
        });


        //map.addLayer(centerPtFeatureLayer);
        //$scope.map.addLayer(centerPtFeatureLayer);

        $scope.addFeatureLayerToMap(centerPtFeatureLayer);

        //console.log($scope.map);

      };




      $scope.convertMapClickPointToGeographic = function (mapPoint) {
        var t = webMercatorUtils.webMercatorToGeographic(mapPoint);
        $scope.$apply(function () {
          $scope.map.mapPointX = t.x;
          $scope.map.mapPointY = t.y;
        });
      };

      $scope.convertPointToGeographic = function (mapPoint) {
        var c = webMercatorUtils.webMercatorToGeographic(mapPoint);
        return c;
      };


    });




  }]);

