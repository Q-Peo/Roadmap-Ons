<?php

// hàm tạo jwt truyền 3 tham số header, payload, và secret key
function generate_jwt($headers, $payload, $secret = '0hLa83lleBroue11e!')
{
	// mã hóa Base64url header
	$headers_encoded = base64url_encode(json_encode($headers));

	// mã hóa Base64url payload 
	$payload_encoded = base64url_encode(json_encode($payload));

	// tạo phần chữ ký bằng phương pháp hash_hmac
	$signature = hash_hmac('SHA256', "$headers_encoded.$payload_encoded", $secret, true);

	// mã hóa phần chữ kí bằng base64url
	$signature_encoded = base64url_encode($signature);

	// kết hợp 3 phần header, payload và signature để tạo ra mã jwt
	$jwt = "$headers_encoded.$payload_encoded.$signature_encoded";

	return $jwt;
}

// hàm check xem mã jwt có hợp lệ không: hàm truyền mã jwt và secretkey
function is_jwt_valid($jwt, $secret = '0hLa83lleBroue11e!')
{
	// tách chuỗi jwt ra bằng hàm explore
	$tokenParts = explode('.', $jwt);
	//giải mã phần header và payload bằng base64_decode
	$header = base64_decode($tokenParts[0]);
	$payload = base64_decode($tokenParts[1]);
	$signature_provided = $tokenParts[2];

	//sau khi giải mã payload kiểm tra xem thời gian expiration mã jwt dùng json_decode giải mã chuỗi 
	$expiration = json_decode($payload)->exp;
	// check xem thời gian expiration hết chưa: lấy exp trừ cho thời gian hiện tại (dùng hàm time())
	$is_token_expired = ($expiration - time()) < 0;

	// tạo chữ ký dựa trên header, payload vừa giải mã và secretkey 
	$base64_url_header = base64url_encode($header);
	$base64_url_payload = base64url_encode($payload);
	$signature = hash_hmac('SHA256', $base64_url_header . "." . $base64_url_payload, $secret, true);
	$base64_url_signature = base64url_encode($signature);

	// tạo biến xác minh xem chữ ký vừa tạo có khớp với chữ ký được cấp không
	$is_signature_valid = ($base64_url_signature === $signature_provided);

	// check xem mã còn hiệu lực k, nếu k thì check biến xem nếu không phải jwt thì trả về false, đúng thì trả về true
	if ($is_token_expired || !$is_signature_valid) {
		return FALSE;
	} else {
		return TRUE;
	}
}

// dùng hàm xử lí mã hóa chuỗi
function base64url_encode($data)
{
	return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

// hàm lấy header
function get_authorization_header()
{
	$headers = null;

	if (isset($_SERVER['Authorization'])) {
		$headers = trim($_SERVER["Authorization"]);
	} else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
		$headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
	} else if (function_exists('apache_request_headers')) {
		$requestHeaders = apache_request_headers();
		// Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
		$requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
		//print_r($requestHeaders);
		if (isset($requestHeaders['Authorization'])) {
			$headers = trim($requestHeaders['Authorization']);
		}
	}

	return $headers;
}

// hàm lấy bearer token
function get_bearer_token()
{
	$headers = get_authorization_header();

	// HEADER: lấy mã token truy cập từ header
	if (!empty($headers)) {
		if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) { // lấy mã token ra khỏi Authorization: Bearer <token>
			return $matches[1]; // trả về mã token
		}
	}
	return null;
}

// echo var_dump(get_authorization_header());

// $check = is_jwt_valid("");
// if ($check) {
//     echo "oke thawfng dau boi";
// } else {
//     echo "meo phai";
// }