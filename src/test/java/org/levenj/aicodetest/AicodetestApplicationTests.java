package org.levenj.aicodetest;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;

@SpringBootTest
class AicodetestApplicationTests {

    @Test
    void contextLoads() {
//        String CODE_OUTPUT_ROOT_DIR = System.getProperty("user.dir") + "/tmp/code_output";
        String CODE_OUTPUT_ROOT_DIR = System.getProperty("user.dir") + File.separator + "tmp" + File.separator + "code_output";
        System.out.println(CODE_OUTPUT_ROOT_DIR);
    }

}
