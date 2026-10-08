package com.shopsmart.gateway;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Enumeration;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.OPTIONS})
public class GatewayProxyController {

    private final RestTemplate restTemplate;

    @Value("${service.product.url:http://localhost:8081}")
    private String productServiceUrl;

    @Value("${service.order.url:http://localhost:8082}")
    private String orderServiceUrl;

    @Value("${service.inventory.url:http://localhost:8083}")
    private String inventoryServiceUrl;

    public GatewayProxyController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @RequestMapping("/api/products/**")
    public ResponseEntity<byte[]> routeProductService(
            @RequestBody(required = false) byte[] body,
            HttpMethod method,
            HttpServletRequest request) throws URISyntaxException {
        return forwardRequest(productServiceUrl, request, method, body);
    }

    @RequestMapping("/api/orders/**")
    public ResponseEntity<byte[]> routeOrderService(
            @RequestBody(required = false) byte[] body,
            HttpMethod method,
            HttpServletRequest request) throws URISyntaxException {
        return forwardRequest(orderServiceUrl, request, method, body);
    }

    @RequestMapping("/api/inventory/**")
    public ResponseEntity<byte[]> routeInventoryService(
            @RequestBody(required = false) byte[] body,
            HttpMethod method,
            HttpServletRequest request) throws URISyntaxException {
        return forwardRequest(inventoryServiceUrl, request, method, body);
    }

    private ResponseEntity<byte[]> forwardRequest(String targetBaseUrl, HttpServletRequest request, HttpMethod method, byte[] body) throws URISyntaxException {
        String requestUri = request.getRequestURI();
        String queryString = request.getQueryString();
        String fullUrl = targetBaseUrl + requestUri + (queryString != null ? "?" + queryString : "");

        HttpHeaders headers = new HttpUrlFilterHeaders();
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            if (!headerName.equalsIgnoreCase("host") && 
                !headerName.equalsIgnoreCase("content-length") &&
                !headerName.equalsIgnoreCase("transfer-encoding")) {
                headers.add(headerName, request.getHeader(headerName));
            }
        }

        HttpEntity<byte[]> httpEntity = new HttpEntity<>(body, headers);
        try {
            ResponseEntity<byte[]> response = restTemplate.exchange(new URI(fullUrl), method, httpEntity, byte[].class);
            HttpHeaders responseHeaders = new HttpHeaders();
            response.getHeaders().forEach((k, v) -> {
                if (!k.equalsIgnoreCase("Transfer-Encoding") && !k.equalsIgnoreCase("Content-Length")) {
                    responseHeaders.put(k, v);
                }
            });
            return new ResponseEntity<>(response.getBody(), responseHeaders, response.getStatusCode());
        } catch (HttpStatusCodeException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .headers(e.getResponseHeaders())
                    .body(e.getResponseBodyAsByteArray());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body(("Gateway Error: Failed to reach downstream microservice: " + e.getMessage()).getBytes());
        }
    }

    private static class HttpUrlFilterHeaders extends HttpHeaders {}
}
