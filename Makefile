all:
	cat apple-app-site-association.json | openssl smime -sign -inkey "$(CERT_DIR)/artsy.net.key" -signer "$(CERT_DIR)/artsy.net.crt" -certfile "$(CERT_DIR)/artsy.net.intermediate.crt" -noattr -nodetach -outform DER > apple-app-site-association
