package com.cuckoo.common.http;


/**
 * @author v
 * @date: 2019/5/31-14:37 <br/>
 * @desc: http 响应码 ，采用5位数
 * <pre>
 *     升级{@link ResponseCodeConstants}
 * </pre>
 */
public enum HttpResponseCodeEnum {

    /**
     * 成功
     */
    SUCCESS(10000, "success"),

    /**
     * 失败
     */
    ERROR(40000, "error"),

    /**
     * 需要认证 未授权
     */
    UNAUTHORIZED(40001, "unauthorized"),

    /**
     * 权限不足
     */
    INSUFFICIENT_AUTHORITY(40002, "insufficient authority"),

    /**
     * 已经存在
     */
    ALREADY_EXISTED(40003, "already existed"),

    /**
     * 没有找到
     */
    NOT_FOUND(40004, "not found"),

    /**
     * 需要重新注册
     */
    NEED_TO_REGISTER(40005, "need to register"),

    /**
     * 踢出下线
     */
    EXIT_OFFLINE(40006, "exit offline"),

    /**
     * api接口频率限制
     */
    API_LIMIT(40010, "api limit"),

    /**
     * 缺少参数
     */
    MISSING_PARAMETERS(41001, "missing parameters"),

    /**
     * 缺少access_token
     */
    MISSING_ACCESS_TOKEN(41002, "missing access_token"),

    /**
     * 缺少 token
     */
    MISSING_TOKEN(41003, "missing token"),

    /**
     * 无效参数
     */
    INVALID_PARAMETER(41004, "invalid parameter"),

    /**
     * 无效access_token
     */
    INVALID_ACCESS_TOKEN(41005, "invalid access_token"),

    /**
     * 无效token
     */
    INVALID_TOKEN(41006, "invalid token"),

    /**
     * 无效时间戳 timestamp
     */
    INVALID_TIMESTAMP(41007, "invalid timestamp");

    /**
     * 状态码
     */
    private int code;

    /**
     * 提示信息
     */
    private String message;

    HttpResponseCodeEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
