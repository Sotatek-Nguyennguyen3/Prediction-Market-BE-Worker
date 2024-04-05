deploy-api:
	docker build -t prediction-api .
	docker run -p 4003:3302 --network  dev-prediction-market -d prediction-api

