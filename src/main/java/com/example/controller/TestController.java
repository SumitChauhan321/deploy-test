package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Message;
import com.example.repository.TestRepository;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class TestController {
	@Autowired
	private TestRepository testRepository;
	
	@PostMapping("msg")
	public ResponseEntity<Message> addmessage(@RequestBody Message msg){
		return ResponseEntity.ok(testRepository.save(msg)); 
	}
	@GetMapping
	public ResponseEntity<List<Message>> getList(){
		return ResponseEntity.ok(testRepository.findAll());
	}
	@DeleteMapping("/msg/{id}")
	public ResponseEntity<String> deleteMessage(@PathVariable("id") Long id) {

	    testRepository.deleteById(id);

	    return ResponseEntity.ok("Message Deleted Successfully");
	}
	
}
