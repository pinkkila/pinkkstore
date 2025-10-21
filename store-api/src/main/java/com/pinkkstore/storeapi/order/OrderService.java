package com.pinkkstore.storeapi.order;

import com.pinkkstore.storeapi.account.AccountService;
import com.pinkkstore.storeapi.cart.Cart;
import com.pinkkstore.storeapi.cart.CartService;
import com.pinkkstore.storeapi.payment.PaymentService;
import com.pinkkstore.storeapi.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final AccountService accountService;
    private final ProductService productService;
    private final PaymentService paymentService;
    private final CartService cartService;
    
    public List<OrderDto> getAllOrders(Authentication authentication) {
        var account = accountService.getAccountByAppUsername(authentication);
        return orderRepository.findAllByAccountId(account.getId()).stream().map(orderMapper::toOrderDto).toList();
    }
    
    public OrderDto getOrder(Authentication authentication, Long orderId) {
        var account = accountService.getAccountByAppUsername(authentication);
        return orderRepository.findByIdAndAccountId(orderId, account.getId())
                .map(orderMapper::toOrderDto)
                .orElseThrow(() -> new OrderNotFoundException(authentication));
    }
    
    @Transactional
    public OrderDto createOrder(Authentication authentication, OrderRequest orderRequest) {
        var account = accountService.getAccountByAppUsername(authentication);
        
        Set<OrderItem> orderItems = orderRequest.orderItems().stream()
                .map(orderItemRequest ->{
                    var product = productService.reduceStockQty(orderItemRequest.productId(), orderItemRequest.productQty());
                    return new OrderItem(null, orderItemRequest.productQty(), product.getPrice(), product.getId());
                })
                .collect(Collectors.toSet());
        
        var priceTotal = orderItems.stream()
                .mapToDouble(item -> item.getProductOrderPrice() * item.getProductQty())
                .sum();
        
        var payment = paymentService.pay(authentication, priceTotal);
        
        cartService.removeCart(authentication);
        
        var newOrder = new Order(null, LocalDateTime.now(), priceTotal, payment.getId(), account.getId(), orderItems);
        var savedOrder = orderRepository.save(newOrder);
        return orderMapper.toOrderDto(savedOrder);
    }
    
}
